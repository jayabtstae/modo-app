import { NavLink } from 'react-router-dom';
import { Home, User, Clock } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-border bg-secondary pb-safe-bottom">
      <div className="mx-auto flex max-w-xl items-center justify-between px-6 py-3">
        <NavLink
          to="/"
          className={({ isActive }) => `inline-flex flex-col items-center gap-1 text-xs ${isActive ? 'text-accent' : 'text-muted'}`}
        >
          <Home size={18} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `inline-flex flex-col items-center gap-1 text-xs ${isActive ? 'text-accent' : 'text-muted'}`}
        >
          <User size={18} />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `inline-flex flex-col items-center gap-1 text-xs ${isActive ? 'text-accent' : 'text-muted'}`}
        >
          <Clock size={18} />
          <span>History</span>
        </NavLink>
      </div>
    </nav>
  );
}
