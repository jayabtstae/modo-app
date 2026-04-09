interface LoadingSpinnerProps {
  size?: number;
}

export default function LoadingSpinner({ size = 18 }: LoadingSpinnerProps) {
  return (
    <span
      className="inline-block h-[18px] w-[18px] animate-spin rounded-full border-[3px] border-solid border-primary border-t-transparent"
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    />
  );
}
