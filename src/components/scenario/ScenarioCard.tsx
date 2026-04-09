import type { Scenario } from '../../types';

interface ScenarioCardProps {
  scenario: Scenario;
}

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  return (
    <div className="rounded-3xl bg-card border border-border p-6 shadow-sm">
      <p className="font-display text-xl font-semibold leading-relaxed text-primary">{scenario.situation}</p>
    </div>
  );
}
