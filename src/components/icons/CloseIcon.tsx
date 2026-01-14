interface CloseIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function CloseIcon({ size = 24, color = 'currentColor', strokeWidth = 2 }: CloseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="20" y1="4" x2="4" y2="20" />
      <line x1="4" y1="4" x2="20" y2="20" />
    </svg>
  );
}
