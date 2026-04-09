import type { PatternDefinition } from '../../types';

interface RevealCardProps {
  pattern: PatternDefinition;
  category: string;
  insight: string;
}

export default function RevealCard({ pattern, category, insight }: RevealCardProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Pattern Badge */}
        <div className="flex justify-center">
          <div className={`animate-reveal rounded-full px-6 py-3 ${pattern.bgClass} ${pattern.colorClass} font-semibold shadow-lg`}>
            {pattern.shortName}
          </div>
        </div>

        {/* Pattern Name */}
        <div className="text-center">
          <h1 className="animate-reveal font-display text-3xl font-bold text-primary" style={{ animationDelay: '0.2s' }}>
            {pattern.name}
          </h1>
          <p className="animate-reveal mt-2 text-secondary" style={{ animationDelay: '0.4s' }}>
            {category}
          </p>
        </div>

        {/* Insight */}
        <div className="animate-reveal rounded-3xl bg-card border border-border p-6 shadow-sm" style={{ animationDelay: '0.6s' }}>
          <p className="font-medium leading-relaxed text-primary">{insight}</p>
        </div>

        {/* Description */}
        <div className="animate-reveal rounded-3xl bg-card border border-border p-6 shadow-sm" style={{ animationDelay: '0.8s' }}>
          <p className="text-sm leading-relaxed text-secondary">{pattern.description}</p>
        </div>
      </div>
    </div>
  );
}
