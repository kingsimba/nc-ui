export type ButtonGroupSize = 'default' | 'small';

export interface ButtonGroupProps<T extends string> {
  /** Currently selected value */
  value: T | null;
  /** Callback when selection changes */
  onChange: (value: T) => void;
  /** Available options */
  options: readonly T[];
  /** Disable all buttons */
  disabled?: boolean;
  /** Custom labels for options */
  labels?: Partial<Record<T, string>>;
  /** Size variant */
  size?: ButtonGroupSize;
}

export function ButtonGroup<T extends string>({
  value,
  onChange,
  options,
  disabled,
  labels,
  size = 'default',
}: ButtonGroupProps<T>) {
  return (
    <div className={`nc-button-group ${size === 'small' ? 'nc-small' : ''}`}>
      {options.map((option, idx) => (
        <button
          key={option}
          className={`nc-button-group-item ${value === option ? 'nc-active' : ''} ${idx < options.length - 1 ? 'nc-has-border' : ''}`}
          onClick={() => !disabled && onChange(option)}
          disabled={disabled}
        >
          {labels && labels[option] ? labels[option] : option}
        </button>
      ))}
    </div>
  );
}
