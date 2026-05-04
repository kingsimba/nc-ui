export type ButtonGroupSize = 'default' | 'small';

export type ButtonGroupOption<T extends string> = {
  key: T;
  label: React.ReactNode;
  disabled?: boolean;
};

export interface ButtonGroupProps<T extends string> {
  /** Currently selected value */
  value: T | null;
  /** Callback when selection changes */
  onChange: (value: T) => void;
  /** Available options */
  options: readonly ButtonGroupOption<T>[];
  /** Disable all buttons */
  disabled?: boolean;
  /** Size variant */
  size?: ButtonGroupSize;
}

export function ButtonGroup<T extends string>({
  value,
  onChange,
  options,
  disabled,
  size = 'default',
}: ButtonGroupProps<T>) {
  return (
    <div className={`nc-button-group ${size === 'small' ? 'nc-small' : ''}`}>
      {options.map((option) => {
        const isDisabled = disabled || !!option.disabled;
        return (
          <button
            key={option.key}
            type="button"
            className={`nc-button-group-item ${value === option.key ? 'nc-active' : ''}`}
            onClick={() => !isDisabled && onChange(option.key)}
            disabled={isDisabled}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
