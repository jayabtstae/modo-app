import type { PropsWithChildren } from 'react';

interface BadgeProps extends PropsWithChildren {
  className?: string;
}

export default function Badge({ className = '', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
