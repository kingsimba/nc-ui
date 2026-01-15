export function UIComponentsIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Large rounded block - Primary Blue */}
      <rect x="3" y="4" width="10" height="10" rx="2" fill="#3b82f6" />

      {/* Circle - Success Green */}
      <circle cx="16" cy="8" r="4" fill="#22c55e" />

      {/* Horizontal Bar - Warning Yellow */}
      <rect x="4" y="16" width="16" height="4" rx="1.5" fill="#f59e0b" />

      {/* Small accent - Danger Red */}
      <rect x="15" y="14" width="4" height="4" rx="1" fill="#ef4444" />
    </svg>
  );
}
