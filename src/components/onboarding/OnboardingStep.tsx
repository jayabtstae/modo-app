import type { PropsWithChildren } from 'react';

interface OnboardingStepProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export default function OnboardingStep({ title, subtitle, children }: OnboardingStepProps) {
  return (
    <div className="rounded-3xl bg-card border border-border p-6">
      <h2 className="font-semibold text-xl text-primary">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
