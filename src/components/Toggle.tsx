export interface ToggleProps {
  /** Whether the toggle is checked/on */
  checked: boolean;
  /** Callback when toggle state changes */
  onChange: (value: boolean) => void;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Label text displayed next to the toggle */
  label?: string;
}

export function Toggle({ checked, onChange, disabled, label }: ToggleProps) {
  return (
    <label className={`nc-toggle-label ${disabled ? 'nc-disabled' : ''}`.trim()}>
      {label && <span className="nc-label" style={{ marginBottom: 0 }}>{label}</span>}

      <span
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        className={`nc-toggle ${checked ? 'nc-checked' : ''}`.trim()}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        onClick={() => !disabled && onChange(!checked)}
      >
        <span className={`nc-toggle-thumb ${checked ? 'nc-checked' : ''}`.trim()} />
      </span>
    </label>
  );
}

export default Toggle;
