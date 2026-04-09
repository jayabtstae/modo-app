import type { ResponseOption } from '../../types';

interface OptionButtonProps {
  option: ResponseOption;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export default function OptionButton({ option, isSelected, isDisabled, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        option-btn w-full rounded-2xl border-2 p-4 text-left transition-all duration-200
        ${isSelected
          ? 'border-accent bg-accent/10 text-primary'
          : 'border-border bg-card text-primary hover:border-accent/50 hover:bg-elevated'
        }
        ${isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
      `}
    >
      <p className="font-medium leading-relaxed">{option.text}</p>
    </button>
  );
}
