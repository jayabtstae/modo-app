import type { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  className?: string;
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <div className={`rounded-3xl bg-card border border-border p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
