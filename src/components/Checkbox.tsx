import React from 'react';

export type CheckboxSize = 'default' | 'small';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Callback when checkbox value changes */
  onChange: (value: boolean) => void;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Label text to display next to checkbox */
  label?: string;
  /** Size variant */
  size?: CheckboxSize;
  /** Custom label color */
  labelColor?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

function CheckIcon({ size }: { size: 'default' | 'small' }) {
  return (
    <svg className={`nc-checkbox-icon ${size === 'small' ? 'nc-small' : ''}`} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 6L5 9L10 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Checkbox({ checked, onChange, disabled, label, size = 'default', labelColor, style, className = '' }: CheckboxProps) {
  const isSmall = size === 'small';
  return (
    <label
      className={`nc-checkbox-label ${isSmall ? 'nc-small' : ''} ${disabled ? 'nc-disabled' : ''} ${className}`.trim()}
      style={style}
      onClick={(e) => {
        if (disabled) return;
        e.preventDefault();
        onChange(!checked);
      }}
    >
      <span
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        className={`nc-checkbox-box ${isSmall ? 'nc-small' : ''} ${checked ? 'nc-checked' : ''}`}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
      >
        {checked && <CheckIcon size={size} />}
      </span>
      {label && (
        <span className="nc-checkbox-text" style={labelColor ? { color: labelColor } : undefined}>
          {label}
        </span>
      )}
    </label>
  );
}
