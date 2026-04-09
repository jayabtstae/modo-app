import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleComplete = () => {
    localStorage.setItem('pm_onboarding_complete', 'true');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-primary">
      <div className="mx-auto max-w-md rounded-[32px] border border-border bg-secondary p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="font-display text-3xl font-semibold">Welcome to PatternMind</h1>
          <p className="mt-3 text-sm text-muted">A daily mirror for how your brain responds to everyday moments.</p>
        </div>

        <div className="space-y-4">
          {step === 1 ? (
            <div>
              <h2 className="font-semibold text-xl">Find out how your brain works.</h2>
              <p className="mt-2 text-sm text-muted">Not a quiz. Not a therapy app. A daily mirror.</p>
            </div>
          ) : step === 2 ? (
            <div>
              <h2 className="font-semibold text-xl">Here's how it works.</h2>
              <p className="mt-2 text-sm text-muted">You see a situation, pick a reaction, and get a pattern reveal.</p>
            </div>
          ) : (
            <div>
              <h2 className="font-semibold text-xl">Your first scenario is ready.</h2>
              <p className="mt-2 text-sm text-muted">You'll start with a quick situation and a simple choice.</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              {step === 1 ? 'Try your first scenario →' : 'Got it →'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              Let's go →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
