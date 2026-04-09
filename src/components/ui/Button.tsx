import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';
import LoadingSpinner from './LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent/90',
  secondary: 'bg-secondary text-primary border border-border hover:bg-secondary/80',
  ghost: 'bg-transparent text-primary hover:bg-secondary/70',
  danger: 'bg-[#DC2626] text-white hover:bg-[#c12722]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, disabled, className = '', children, ...props }, ref) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={`inline-flex min-w-[120px] items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 active:scale-95 ${variantStyles[variant]} ${sizeStyles[size]} ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        {...props}
      >
        {isLoading && <LoadingSpinner size={16} />}
        <span>{children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
