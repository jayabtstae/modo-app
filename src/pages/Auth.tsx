import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';
  const { user, isLoading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      navigate(redirect, { replace: true });
    }
  }, [user, isLoading, navigate, redirect]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    const action = mode === 'signup' ? signUp : signIn;
    const result = await action(email.trim(), password);

    if (result.error) {
      setMessage(result.error.replace(/\.$/, '')); 
    } else if (mode === 'signup') {
      setMessage('Check your email for a confirmation link, then sign in.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background text-primary px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-md rounded-[32px] border border-border bg-secondary p-6 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-semibold">PatternMind</h1>
          <p className="mt-3 text-sm text-muted">Save your thinking profile with an email account.</p>
        </div>

        <div className="mb-6 flex items-center justify-center gap-2 rounded-2xl bg-card p-2">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`rounded-2xl px-4 py-2 transition ${mode === 'signin' ? 'bg-accent text-white' : 'text-muted hover:text-primary'}`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`rounded-2xl px-4 py-2 transition ${mode === 'signup' ? 'bg-accent text-white' : 'text-muted hover:text-primary'}`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-dim" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-primary outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-dim" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-primary outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/15"
            />
          </div>

          {message ? <p className="text-sm text-warning">{message}</p> : null}

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            {mode === 'signup' ? 'Create account' : 'Continue'}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          {mode === 'signup'
            ? 'Already have an account?'
            : 'New to PatternMind?'}{' '}
          <button
            type="button"
            className="font-semibold text-accent hover:text-accent/80"
            onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          >
            {mode === 'signup' ? 'Sign in' : 'Sign up'}
          </button>
        </p>

        <p className="mt-4 text-center text-xs text-muted">
          No social login. Email and password only.
        </p>
      </div>
    </div>
  );
}
