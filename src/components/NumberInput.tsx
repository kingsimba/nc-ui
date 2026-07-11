import React, { useRef, useState } from 'react';

const DRAG_PIXELS_PER_STEP = 5;
const DRAG_THRESHOLD = 3;

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
  /** Additional CSS class names for the input and spinner control */
  className?: string;
  /** Additional inline styles for the input and spinner control */
  style?: React.CSSProperties;
  /** Size variant */
  size?: 'default' | 'small';
}

export function NumberInput({ value, onChange, min, max, step = 1, label, disabled, className = '', style, size = 'default' }: NumberInputProps) {
  const isSmall = size === 'small';
  const decimals = (String(step).split('.')[1] || '').length;
  const dragState = useRef<{ startY: number; startValue: number; pointerId: number; hasMoved: boolean; lastValue: number } | null>(null);
  const suppressClick = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [textValue, setTextValue] = useState(() => String(value));

  const round = (v: number) => parseFloat(v.toFixed(decimals));

  const commitValue = (v: number) => {
    const rounded = round(v);
    setTextValue(String(rounded));
    onChange(rounded);
  };

  const decrement = () => {
    const newValue = value - step;
    if (min !== undefined && newValue < min) return;
    commitValue(parseFloat(newValue.toFixed(10)));
  };

  const increment = () => {
    const newValue = value + step;
    if (max !== undefined && newValue > max) return;
    commitValue(parseFloat(newValue.toFixed(10)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setTextValue(raw);
    if (raw === '') return;
    const parsed = parseFloat(raw);
    if (isNaN(parsed)) return;
    onChange(parsed);
  };

  const handleBlur = () => {
    const raw = textValue;
    if (raw === '') {
      commitValue(min !== undefined ? min : 0);
      return;
    }
    const parsed = parseFloat(raw);
    if (isNaN(parsed)) {
      commitValue(min !== undefined ? min : 0);
      return;
    }
    let clamped = round(parsed);
    if (min !== undefined) clamped = Math.max(min, clamped);
    if (max !== undefined) clamped = Math.min(max, clamped);
    if (clamped !== parsed) commitValue(clamped);
    else setTextValue(String(clamped));
  };

  const handleSpinnerPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || e.button !== 0) return;

    suppressClick.current = false;
    dragState.current = {
      startY: e.clientY,
      startValue: value,
      pointerId: e.pointerId,
      hasMoved: false,
      lastValue: value,
    };
    holdTimer.current = setTimeout(() => { suppressClick.current = true; setIsDragging(true); }, 200);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleSpinnerPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== e.pointerId) return;

    const distance = state.startY - e.clientY;
    if (Math.abs(distance) >= DRAG_THRESHOLD) {
      state.hasMoved = true;
      suppressClick.current = true;
      if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null; }
      setIsDragging(true);
    }
    if (!state.hasMoved) return;

    const steps = Math.trunc(distance / DRAG_PIXELS_PER_STEP);
    let newValue = state.startValue + steps * step;
    if (min !== undefined) newValue = Math.max(min, newValue);
    if (max !== undefined) newValue = Math.min(max, newValue);
    newValue = round(newValue);

    if (newValue !== state.lastValue) {
      state.lastValue = newValue;
      setTextValue(String(newValue));
      onChange(newValue);
    }
  };

  const handleSpinnerPointerEnd = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== e.pointerId) return;

    if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null; }
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragState.current = null;
    setIsDragging(false);
  };

  const handleSpinClick = (change: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      e.preventDefault();
      return;
    }
    change();
  };

  const parsed = textValue === '' ? NaN : parseFloat(textValue);
  const isError = textValue === '' || isNaN(parsed) || (min !== undefined && parsed < min) || (max !== undefined && parsed > max);

  return (
    <div className={`nc-col nc-number-input-col ${isSmall ? 'nc-small' : ''}`}>
      {label && <span className={`nc-label ${isSmall ? 'nc-small' : ''}`}>{label}</span>}
      <div className={`nc-number-input-container ${isSmall ? 'nc-small' : ''} ${className}`} style={style}>
        <input
          className={`nc-input nc-number-input ${isSmall ? 'nc-small' : ''} ${isError ? 'nc-error' : ''}`}
          type="number"
          value={textValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        <div
          className={`nc-number-input-spinners ${isSmall ? 'nc-small' : ''} ${disabled ? 'nc-disabled' : ''} ${isDragging ? 'nc-dragging' : ''}`}
        >
          <button
            className={`nc-number-input-spin nc-number-input-spin-up ${isSmall ? 'nc-small' : ''}`}
            onClick={handleSpinClick(increment)}
            onPointerDown={handleSpinnerPointerDown}
            onPointerMove={handleSpinnerPointerMove}
            onPointerUp={handleSpinnerPointerEnd}
            onPointerCancel={handleSpinnerPointerEnd}
            disabled={disabled || (max !== undefined && value >= max)}
            tabIndex={-1}
          >
            ▲
          </button>
          <button
            className={`nc-number-input-spin nc-number-input-spin-down ${isSmall ? 'nc-small' : ''}`}
            onClick={handleSpinClick(decrement)}
            onPointerDown={handleSpinnerPointerDown}
            onPointerMove={handleSpinnerPointerMove}
            onPointerUp={handleSpinnerPointerEnd}
            onPointerCancel={handleSpinnerPointerEnd}
            disabled={disabled || (min !== undefined && value <= min)}
            tabIndex={-1}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}
