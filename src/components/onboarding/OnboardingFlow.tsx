import { useState } from 'react';
import Button from '../ui/Button';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: 'Find out how your brain works.',
      subtitle: 'Not a quiz. Not a therapy app. A daily mirror.',
      content: 'PatternMind helps you discover the cognitive patterns behind your everyday reactions.',
    },
    {
      title: "Here's how it works.",
      subtitle: '3 steps, 2 minutes a day.',
      content: 'You see a relatable situation, pick your instinctive reaction, and get a pattern reveal.',
    },
    {
      title: 'Your first scenario is ready.',
      subtitle: 'Ready to start?',
      content: 'Tap below to begin your first daily scenario.',
    },
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-primary">{steps[step - 1].title}</h1>
          <p className="mt-3 text-sm text-muted">{steps[step - 1].subtitle}</p>
        </div>

        <div className="mb-8 rounded-3xl bg-card border border-border p-6">
          <p className="text-base leading-relaxed text-primary">{steps[step - 1].content}</p>
        </div>

        <Button onClick={handleNext} className="w-full">
          {step === steps.length ? "Let's go →" : 'Next →'}
        </Button>
      </div>
    </div>
  );
}
