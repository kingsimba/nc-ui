export interface ActivityIndicatorProps {
  /** Size of the spinner */
  size?: 'small' | 'default' | 'large';
  /** Custom color (defaults to --primary) */
  color?: string;
  /** If true, renders in an overlay that covers the parent element and blocks clicks */
  overlay?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * ActivityIndicator - A spinning loading indicator.
 * 
 * Usage:
 * 1. Inline spinner: <ActivityIndicator size="small" />
 * 2. Overlay on parent (parent must have position: relative):
 *    <div style={{ position: 'relative' }}>
 *      <Button>Click me</Button>
 *      {isLoading && <ActivityIndicator overlay />}
 *    </div>
 * 3. Cover entire dialog: Place overlay ActivityIndicator inside dialog container
 */
export function ActivityIndicator({
  size = 'default',
  color,
  overlay = false,
  className = '',
}: ActivityIndicatorProps) {
  const spinner = (
    <svg
      className={`nc-activity-indicator nc-${size} ${className}`}
      viewBox="0 0 50 50"
      style={color ? { color } : undefined}
    >
      <circle
        className="nc-activity-indicator-circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );

  if (overlay) {
    return (
      <div className="nc-activity-indicator-overlay">
        {spinner}
      </div>
    );
  }

  return spinner;
}
