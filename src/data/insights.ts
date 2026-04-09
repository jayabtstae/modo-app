import type { PatternType, SituationCategory } from '../types';

export function getInsightCopy(
  pattern: PatternType,
  category: SituationCategory,
  _userHistory?: PatternType[],
): string {
  const key = `${pattern}_${category}` as keyof typeof insightMap;
  return insightMap[key] ?? insightMap[`${pattern}_default` as keyof typeof insightMap] ?? defaultInsight;
}

const insightMap = {
  catastrophising_work:     "You took a moment at work and built a disaster around it. Your brain is scanning for threats that aren't confirmed yet.",
  catastrophising_academic: "One result became the whole verdict. You're not failing — you're forecasting failure from incomplete evidence.",
  catastrophising_social:   "A single interaction became proof of something much bigger. That leap is your brain trying to protect you. It's just not accurate.",
  catastrophising_family:   "One difficult moment became a sign of something permanent. Most family friction is temporary, not structural.",
  catastrophising_self:     "You went from one missed day to a complete collapse of everything. That gap — that's catastrophising.",

  mind_reading_social:      "You decided what they were thinking — without asking. You're filling in silence with the worst possible script.",
  mind_reading_work:        "You read the room and wrote your own review. The person you were watching might have been thinking something completely different.",
  mind_reading_academic:    "You assumed how others performed without any actual data. Your brain invented a leaderboard and put you at the bottom.",
  mind_reading_family:      "You interpreted their tone as a message directed at you. It might have had nothing to do with you at all.",
  mind_reading_self:        "You decided what others think of you — as if you had access to their inner monologue. You don't.",

  overgeneralisation_social:   "'Always' and 'never' are rarely accurate. One pattern isn't a law.",
  overgeneralisation_work:     "You took this one moment and made it a permanent rule about how things always go for you at work.",
  overgeneralisation_academic: "One result became a permanent truth about your ability. Results fluctuate. Identity doesn't have to.",
  overgeneralisation_family:   "You turned one incident into evidence of a pattern that may not exist.",
  overgeneralisation_self:     "One miss became proof of a character flaw. That's overgeneralising — and it's not fair to you.",

  personalisation_social:   "You took on responsibility for their behaviour. Most of the time, other people's reactions are about their own world, not yours.",
  personalisation_work:     "You made their silence about you. People are usually preoccupied with their own pressures, not yours.",
  personalisation_family:   "You carried their mood as if it were yours to fix. It probably wasn't yours to carry.",
  personalisation_academic: "You assumed the outcome was entirely determined by you. External factors exist too.",
  personalisation_self:     "You blamed yourself for something with multiple possible causes. That's personalisation — and it's heavier than you need to carry.",

  jumping_to_conclusions_social:   "You saw one sign and wrote the whole story. The story might be fiction.",
  jumping_to_conclusions_work:     "You concluded something significant from one data point. That's not enough evidence yet.",
  jumping_to_conclusions_academic: "You decided the outcome before all the information was in. Your brain wanted certainty, even at the cost of accuracy.",
  jumping_to_conclusions_family:   "You interpreted one moment as evidence of a bigger truth. The evidence isn't complete.",
  jumping_to_conclusions_self:     "You made a firm prediction about yourself from thin evidence. You might be wrong.",

  should_statements_work:     "You held yourself to a rule and punished yourself for not meeting it. Where did that rule come from?",
  should_statements_academic: "The word 'should' is doing a lot of work there. Whose standard is that?",
  should_statements_social:   "You've got a rule about how people should behave. Rules like that lead to a lot of disappointment.",
  should_statements_family:   "Expectations framed as 'shoulds' tend to breed resentment — in both directions.",
  should_statements_self:     "You have a rulebook for yourself that you'd probably never apply to someone you care about.",

  balanced_default:           "You gave that situation room to breathe. That's harder than it sounds — most people fill the uncertainty with their worst guess.",
  balanced_social:            "You held back from filling in the blanks with something negative. That takes more practice than most people realise.",
  balanced_work:              "You left space for other explanations. That's the kind of thinking that keeps you out of unnecessary spirals.",
  balanced_academic:          "You didn't let one result define the whole picture. That's a useful skill to have.",
  balanced_family:            "You extended some grace before concluding something. Good instinct.",
  balanced_self:              "You didn't catastrophise or minimise. You just... saw it clearly. That's the goal.",

  catastrophising_default:        "You built something big from something small. Worth noticing when that happens.",
  mind_reading_default:           "You assumed you knew what was in someone else's head. You might be right — but you might not be.",
  overgeneralisation_default:     "One moment became a permanent rule. That's overgeneralising — and it's worth questioning.",
  black_white_thinking_default:   "You saw this in absolutes. Most things live in the grey area in between.",
  personalisation_default:        "You made it about you. It might not have been.",
  filtering_default:              "You focused on the one thing that confirmed the negative. Everything else faded out.",
  emotional_reasoning_default:    "You treated a feeling as a fact. Feelings are real — but they're not always accurate reports on reality.",
  minimisation_default:           "You downplayed something real. That's worth sitting with.",
  jumping_to_conclusions_default: "You reached a conclusion before the evidence was in.",
  should_statements_default:      "That 'should' is carrying a lot of weight. It's worth asking where it came from.",
} as const;

const defaultInsight = "That reaction reveals something about how you process uncertainty. Worth sitting with.";
