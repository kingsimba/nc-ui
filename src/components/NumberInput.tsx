import React, { useEffect, useRef, useState } from 'react';

const DRAG_PIXELS_PER_STEP = 5;
const DRAG_THRESHOLD = 3;

/** Text shown for a value, with `undefined` meaning an empty field. */
function format(value: number | undefined): string {
  return value === undefined ? '' : String(value);
}

export interface NumberInputProps {
  /** Current numeric value; `undefined` renders an empty field */
  value?: number;
  /** Callback when the draft value changes */
  onChange?: (value: number) => void;
  /** Callback when an edit is confirmed with Enter or blur; `undefined` clears an empty-allowed field */
  onChangeConfirmed?: (value: number | undefined) => void;
  /** Callback when Esc cancels the edit */
  onCancel?: () => void;
  /** Whether an empty field is a valid state instead of falling back to `min` or `0` */
  allowEmpty?: boolean;
  /** Placeholder shown while the field is empty */
  placeholder?: string;
  /** Accessible name, for a field whose label lives outside the control */
  ariaLabel?: string;
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

export function NumberInput({
  value,
  onChange,
  onChangeConfirmed,
  onCancel,
  allowEmpty = false,
  placeholder,
  ariaLabel,
  min,
  max,
  step = 1,
  label,
  disabled,
  className = '',
  style,
  size = 'default',
}: NumberInputProps) {
  const isSmall = size === 'small';
  const decimals = (String(step).split('.')[1] || '').length;
  const dragState = useRef<{ startY: number; startValue: number; pointerId: number; hasMoved: boolean; lastValue: number } | null>(null);
  const suppressClick = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousValue = useRef(value);
  // set when Enter or Escape already handled the edit, so the blur that follows does not commit again
  const editSettledOnBlur = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [textValue, setTextValue] = useState(() => format(value));

  const round = (v: number) => parseFloat(v.toFixed(decimals));
  const baseValue = value ?? min ?? 0;

  // an external change wins, unless the pointer is in the field and would lose a half-typed number
  useEffect(() => {
    if (previousValue.current === value) return;
    previousValue.current = value;
    if (document.activeElement === inputRef.current) return;
    setTextValue(format(value));
  }, [value]);

  const commitValue = (v: number) => {
    const rounded = round(v);
    setTextValue(String(rounded));
    onChange?.(rounded);
    onChangeConfirmed?.(rounded);
  };

  const decrement = () => {
    const newValue = round(baseValue - step);
    if (min !== undefined && newValue < min) return;
    commitValue(parseFloat(newValue.toFixed(10)));
  };

  const increment = () => {
    const newValue = round(baseValue + step);
    if (max !== undefined && newValue > max) return;
    commitValue(parseFloat(newValue.toFixed(10)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setTextValue(raw);
    if (raw === '') return;
    const parsed = parseFloat(raw);
    if (isNaN(parsed)) return;
    onChange?.(parsed);
  };

  const commit = () => {
    if (disabled) return;
    const raw = textValue.trim();
    const unchanged = textValue === format(value);

    if (raw === '') {
      if (allowEmpty) {
        if (!unchanged) onChangeConfirmed?.(undefined);
        return;
      }
      const fallback = round(min ?? 0);
      setTextValue(String(fallback));
      if (fallback !== value) {
        onChange?.(fallback);
        onChangeConfirmed?.(fallback);
      }
      return;
    }

    const parsed = parseFloat(raw);
    if (!Number.isFinite(parsed)) {
      setTextValue(format(value));
      return;
    }

    let next = round(parsed);
    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);
    if (next !== parsed) setTextValue(String(next));
    if (!unchanged || next !== value) {
      onChange?.(next);
      onChangeConfirmed?.(next);
    }
  };

  const handleSpinnerPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || e.button !== 0) return;

    suppressClick.current = false;
    dragState.current = {
      startY: e.clientY,
      startValue: baseValue,
      pointerId: e.pointerId,
      hasMoved: false,
      lastValue: baseValue,
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

    // the draft streams while dragging; the confirmed callback waits for the gesture to end
    if (newValue !== state.lastValue) {
      state.lastValue = newValue;
      setTextValue(String(newValue));
      onChange?.(newValue);
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

    if (state.lastValue !== state.startValue) {
      onChangeConfirmed?.(state.lastValue);
    }
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
  const isEmpty = textValue === '' && allowEmpty;
  const isError =
    !isEmpty &&
    (textValue === '' || isNaN(parsed) || (min !== undefined && parsed < min) || (max !== undefined && parsed > max));

  return (
    <div className={`nc-col nc-number-input-col ${isSmall ? 'nc-small' : ''}`}>
      {label && <span className={`nc-label ${isSmall ? 'nc-small' : ''}`}>{label}</span>}
      <div className={`nc-number-input-container ${isSmall ? 'nc-small' : ''} ${className}`} style={style}>
        <input
          ref={inputRef}
          className={`nc-input nc-number-input ${isSmall ? 'nc-small' : ''} ${isError ? 'nc-error' : ''}`}
          type="number"
          value={textValue}
          placeholder={placeholder}
          aria-label={ariaLabel}
          onChange={handleInputChange}
          onBlur={() => {
            if (editSettledOnBlur.current) {
              editSettledOnBlur.current = false;
              return;
            }
            commit();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              editSettledOnBlur.current = true;
              commit();
              e.currentTarget.blur();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              editSettledOnBlur.current = true;
              setTextValue(format(value));
              onCancel?.();
              e.currentTarget.blur();
            }
          }}
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
            disabled={disabled || (max !== undefined && baseValue >= max)}
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
            disabled={disabled || (min !== undefined && baseValue <= min)}
            tabIndex={-1}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}
