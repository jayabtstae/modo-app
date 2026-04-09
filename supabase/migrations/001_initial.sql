-- ─────────────────────────────────────────────
-- User responses
-- ─────────────────────────────────────────────
create table public.user_responses (
  id                uuid default gen_random_uuid() primary key,
  user_id           uuid references auth.users(id) on delete cascade not null,
  scenario_id       text not null,
  selected_option_id text not null,
  pattern_detected  text not null,
  category          text not null,
  insight_copy      text not null,
  created_at        timestamptz default timezone('utc', now()) not null
);

create index user_responses_user_id_idx on public.user_responses(user_id);
create index user_responses_created_at_idx on public.user_responses(created_at desc);

-- ─────────────────────────────────────────────
-- Pattern profiles (denormalised for fast reads)
-- ─────────────────────────────────────────────
create table public.pattern_profiles (
  id                  uuid default gen_random_uuid() primary key,
  user_id             uuid references auth.users(id) on delete cascade not null unique,
  patterns            jsonb not null default '{}',
  dominant_pattern    text,
  total_responses     integer default 0,
  category_breakdown  jsonb not null default '{}',
  last_updated        timestamptz default timezone('utc', now()) not null
);

-- ─────────────────────────────────────────────
-- Row Level Security — users see only their own data
-- ─────────────────────────────────────────────
alter table public.user_responses enable row level security;
alter table public.pattern_profiles enable row level security;

create policy "Users can read own responses"
  on public.user_responses for select
  using (auth.uid() = user_id);

create policy "Users can insert own responses"
  on public.user_responses for insert
  with check (auth.uid() = user_id);

create policy "Users can read own profile"
  on public.pattern_profiles for select
  using (auth.uid() = user_id);

create policy "Users can upsert own profile"
  on public.pattern_profiles for all
  using (auth.uid() = user_id);
