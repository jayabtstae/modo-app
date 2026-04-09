import type { PropsWithChildren } from 'react';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

interface AppShellProps extends PropsWithChildren {
  showNav?: boolean;
  streak?: number;
}

export default function AppShell({ children, showNav = true, streak = 0 }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-primary">
      <TopBar streak={streak} />
      <main className={`pb-24 ${showNav ? '' : 'pb-6'}`}>{children}</main>
      {showNav ? <BottomNav /> : null}
    </div>
  );
}
