export function UIComponentsIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Grid/component icon - 4 squares representing UI components */}
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}
