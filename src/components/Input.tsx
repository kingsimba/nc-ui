import React, { useRef } from 'react';

export interface InputProps {
  /** Current value of the input */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when Enter key is pressed */
  onEnter?: () => void;
  /** Callback when input is cleared */
  onClear?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Label text displayed above the input */
  label?: string;
  /** Whether to show a clear button when there's a value */
  clearable?: boolean;
  /** Input type (text, password, email, etc.) */
  type?: string;
  /** Additional CSS class names */
  className?: string;
  /** Size variant */
  size?: 'default' | 'small';
  /** Additional inline styles */
  style?: React.CSSProperties;
}

function ClearButton({ onClick, size = 'default' }: { onClick: () => void; size?: 'default' | 'small' }) {
  const buttonSize = size === 'small' ? 28 : 34;
  return (
    <button
      className="nc-button nc-ghost"
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      tabIndex={-1}
      aria-label="Clear input"
      style={{
        position: 'absolute',
        right: 4,
        padding: 0,
        minHeight: 0,
        height: buttonSize,
        width: buttonSize,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size === 'small' ? '12px' : '14px',
      }}
    >
      ✕
    </button>
  );
}

export function Input({
  value = '',
  onChange,
  onEnter,
  onClear,
  placeholder,
  disabled,
  label,
  clearable = true,
  type = 'text',
  className = '',
  size = 'default',
  style,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const showClearButton = clearable && value && !disabled;
  const clearButtonWidth = size === 'small' ? 32 : 44;
  const paddingRight = showClearButton ? clearButtonWidth : 12;

  const handleClear = () => {
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter?.();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const inputClassName = `nc-input ${size === 'small' ? `nc-small ` : ''} ${className}`;

  return (
    <div className="nc-col" style={{ position: 'relative', flex: 1, ...style }}>
      {label && <span className="nc-label">{label}</span>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type={type}
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          style={{
            width: '100%',
            paddingRight,
          }}
        />
        {showClearButton && <ClearButton onClick={handleClear} size={size} />}
      </div>
    </div>
  );
}
