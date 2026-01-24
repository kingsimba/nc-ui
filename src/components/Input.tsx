import React, { useRef, useState } from 'react';
import { ViewIcon, EyeHiddenIcon } from './icons';

export interface InputProps {
  /** Current value of the input (controlled mode) */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
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
  /** Whether to show a toggle button for password visibility (only works when type is 'password') */
  showPasswordToggle?: boolean;
  /** Whether to use a textarea for multiline input */
  multiline?: boolean;
  /** Number of rows for multiline input */
  rows?: number;
  /** Validation function that returns an error message string if invalid, or null/undefined if valid */
  validator?: (value: string) => string | null | undefined;
  /** Whether to display the error message text (still shows red border when false) */
  showErrorMessage?: boolean;
}

function ClearButton({ onClick, size = 'default', rightOffset = 4 }: { onClick: () => void; size?: 'default' | 'small'; rightOffset?: number }) {
  const buttonSize = size === 'small' ? 28 : 34;
  return (
    <button
      className="nc-button nc-ghost"
      onClick={onClick}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      tabIndex={-1}
      aria-label="Clear input"
      style={{
        position: 'absolute',
        right: rightOffset,
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

function TogglePasswordButton({ visible, onClick, size = 'default' }: { visible: boolean; onClick: () => void; size?: 'default' | 'small' }) {
  const buttonSize = size === 'small' ? 28 : 34;
  const iconSize = size === 'small' ? 16 : 18;
  return (
    <button
      className="nc-button nc-ghost"
      onClick={onClick}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      tabIndex={-1}
      aria-label={visible ? 'Hide password' : 'Show password'}
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
      }}
    >
      {visible ? <EyeHiddenIcon size={iconSize} /> : <ViewIcon size={iconSize} />}
    </button>
  );
}

export function Input({
  value: controlledValue,
  defaultValue = '',
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
  showPasswordToggle = false,
  multiline = false,
  rows = 3,
  validator,
  showErrorMessage = true,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Support both controlled and uncontrolled modes
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  // Compute validation error
  const validationError = validator ? validator(value) : null;
  const hasError = !!validationError;

  const isPasswordType = type === 'password';
  const showToggle = isPasswordType && showPasswordToggle && !disabled && !multiline;
  const showClearButton = clearable && value && !disabled && isFocused;

  const buttonWidth = size === 'small' ? 32 : 44;
  let paddingRight = 12;
  if (showClearButton && showToggle) {
    paddingRight = buttonWidth * 2;
  } else if (showClearButton || showToggle) {
    paddingRight = buttonWidth;
  }

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChange?.('');
    onClear?.();
    if (multiline) {
      textareaRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !multiline) {
      onEnter?.();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputClassName = `nc-input ${size === 'small' ? `nc-small ` : ''} ${hasError ? 'nc-error ' : ''}${className}`;

  return (
    <div className="nc-col" style={{ position: 'relative', flex: 1, ...style }}>
      {label && <span className="nc-label">{label}</span>}
      <div style={{ position: 'relative', display: 'flex', alignItems: multiline ? 'flex-start' : 'center' }}>
        {multiline ? (
          <textarea
            ref={textareaRef}
            className={inputClassName}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            rows={rows}
            style={{
              width: '100%',
              paddingRight,
            }}
          />
        ) : (
          <input
            ref={inputRef}
            type={isPasswordType && passwordVisible ? 'text' : type}
            className={inputClassName}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            style={{
              width: '100%',
              paddingRight,
            }}
          />
        )}
        {showClearButton && <ClearButton onClick={handleClear} size={size} rightOffset={showToggle ? buttonWidth + 4 : 4} />}
        {showToggle && <TogglePasswordButton visible={passwordVisible} onClick={() => setPasswordVisible(!passwordVisible)} size={size} />}
      </div>
      {hasError && showErrorMessage && <span className="nc-error-message">{validationError}</span>}
    </div>
  );
}
