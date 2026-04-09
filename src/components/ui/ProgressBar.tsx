interface ProgressBarProps {
  label: string;
  value: number;
  className?: string;
}

export default function ProgressBar({ label, value, className = '' }: ProgressBarProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-28 text-sm text-dim">{label}</div>
      <div className="flex-1 overflow-hidden rounded-full bg-elevated h-2">
        <div
          className="h-full rounded-full bg-accent animate-bar"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <div className="w-12 text-right text-sm text-muted">{value}%</div>
    </div>
  );
}
