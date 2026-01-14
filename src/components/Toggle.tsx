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
    <label
      className="nc-row"
      style={{ gap: 10, alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {label && <span className="nc-label">{label}</span>}

      <span
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          position: 'relative',
          width: 56,
          height: 30,
          borderRadius: 18,
          padding: 4,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          border: `2px solid ${checked ? 'var(--nc-primary)' : 'var(--nc-button-border)'}`,
          background: checked ? 'rgba(99,102,241,0.08)' : 'transparent',
          transition: 'border-color 160ms, background 160ms',
        }}
      >
        {/* thumb */}
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 12,
            background: checked ? 'var(--nc-text)' : 'var(--nc-muted)',
            transform: `translateX(${checked ? 24 : 0}px)`,
            transition: 'transform 160ms, background 160ms',
            boxShadow: checked ? '0 2px 6px rgba(99,102,241,0.28)' : '0 1px 2px rgba(0,0,0,0.08)',
            border: 'none',
          }}
        />
      </span>
    </label>
  );
}

export default Toggle;
