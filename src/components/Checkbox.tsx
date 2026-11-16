import React from 'react';

export type CheckboxSize = 'default' | 'small' | 'tiny';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Whether the checkbox reports a mixed value across a selection */
  indeterminate?: boolean;
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

function CheckIcon({ size }: { size: 'default' | 'small' | 'tiny' }) {
  return (
    <svg className={`nc-checkbox-icon ${size === 'small' ? 'nc-small' : size === 'tiny' ? 'nc-tiny' : ''}`} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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

function MixedIcon({ size }: { size: 'default' | 'small' | 'tiny' }) {
  return (
    <svg className={`nc-checkbox-icon ${size === 'small' ? 'nc-small' : size === 'tiny' ? 'nc-tiny' : ''}`} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Checkbox({ checked, indeterminate = false, onChange, disabled, label, size = 'default', labelColor, style, className = '' }: CheckboxProps) {
  const isSmall = size === 'small';
  const isTiny = size === 'tiny';
  const marked = indeterminate || checked;
  return (
    <label
      className={`nc-checkbox-label ${isSmall ? 'nc-small' : ''} ${isTiny ? 'nc-tiny' : ''} ${disabled ? 'nc-disabled' : ''} ${className}`.trim()}
      style={style}
      onClick={(e) => {
        if (disabled) return;
        e.preventDefault();
        onChange(!checked);
      }}
    >
      <span
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        tabIndex={0}
        className={`nc-checkbox-box ${isSmall ? 'nc-small' : ''} ${isTiny ? 'nc-tiny' : ''} ${marked ? 'nc-checked' : ''} ${indeterminate ? 'nc-indeterminate' : ''}`}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
      >
        {indeterminate ? <MixedIcon size={size} /> : checked && <CheckIcon size={size} />}
      </span>
      {label && (
        <span className="nc-checkbox-text" style={labelColor ? { color: labelColor } : undefined}>
          {label}
        </span>
      )}
    </label>
  );
}
