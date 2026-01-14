import React from 'react';

export interface NumberInputProps {
  /** Current numeric value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment/decrement value */
  step?: number;
  /** Label text displayed above the input */
  label?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: 'default' | 'small';
}

export function NumberInput({ value, onChange, min, max, step = 1, label, disabled, size = 'default' }: NumberInputProps) {
  const isSmall = size === 'small';

  const decrement = () => {
    const newValue = value - step;
    if (min !== undefined && newValue < min) return;
    onChange(parseFloat(newValue.toFixed(10))); // Avoid floating point precision issues
  };

  const increment = () => {
    const newValue = value + step;
    if (max !== undefined && newValue > max) return;
    onChange(parseFloat(newValue.toFixed(10)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) return;
    if (min !== undefined && newValue < min) return;
    if (max !== undefined && newValue > max) return;
    onChange(newValue);
  };

  return (
    <div className={`nc-col nc-number-input-col ${isSmall ? 'nc-small' : ''}`}>
      {label && <span className={`nc-label ${isSmall ? 'nc-small' : ''}`}>{label}</span>}
      <div className={`nc-number-input-container ${isSmall ? 'nc-small' : ''}`}>
        <input
          className={`nc-input nc-number-input ${isSmall ? 'nc-small' : ''}`}
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        <button
          className={`nc-button nc-ghost nc-number-input-button ${isSmall ? 'nc-small' : ''}`}
          onClick={decrement}
          disabled={disabled || (min !== undefined && value <= min)}
        >
          −
        </button>
        <button
          className={`nc-button nc-ghost nc-number-input-button ${isSmall ? 'nc-small' : ''}`}
          onClick={increment}
          disabled={disabled || (max !== undefined && value >= max)}
        >
          +
        </button>
      </div>
    </div>
  );
}
