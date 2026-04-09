import { Flame } from 'lucide-react';

interface TopBarProps {
  streak: number;
}

export default function TopBar({ streak }: TopBarProps) {
  return (
    <header className="safe-top flex h-14 items-center justify-between border-b border-border bg-secondary px-4 text-sm text-primary">
      <div className="font-sans text-base font-semibold tracking-tight">
        Pattern<span className="font-display italic">Mind</span>
      </div>
      <div className="inline-flex items-center gap-2 text-warning font-semibold">
        <Flame size={16} />
        <span>{streak}</span>
      </div>
    </header>
  );
}
