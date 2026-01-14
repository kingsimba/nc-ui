export type BatteryStatus = 'charging' | 'discharging' | 'full';

export interface BatteryProps {
  /** Battery level from 0.0 to 1.0 */
  percentage?: number;
  /** Current battery status */
  status?: BatteryStatus;
  /** Use light colors for dark backgrounds */
  darkMode?: boolean;
  /** Use threshold-based coloring (danger/warning/success) */
  colored?: boolean;
}

export function Battery({
  percentage = 0.5,
  status = 'discharging',
  darkMode = false,
  colored = false,
}: BatteryProps) {
  const percent = Math.max(0, Math.min(1, Number(percentage) || 0));

  // Determine fill color based on colored mode and percentage thresholds
  let fillColor: string;
  if (colored) {
    // Threshold-based coloring using CSS variables
    if (percent < 0.1) {
      fillColor = 'var(--nc-danger)';
    } else if (percent < 0.2) {
      fillColor = 'var(--nc-warning)';
    } else {
      fillColor = 'var(--nc-success)';
    }
  } else {
    // Monochrome mode based on darkMode
    fillColor = darkMode ? '#ffffff' : '#000000';
  }

  // Semi-transparent background color
  const backgroundColor = darkMode
    ? 'rgba(255, 255, 255, 0.5)'
    : 'rgba(0, 0, 0, 0.2)';

  // Reduced default size for compact display in the status bar
  const width = 24; // body width
  const height = 14;
  const capWidth = 2;
  const capSpacing = 0;
  const boltSpace = 12; // extra space to the right for the lightning icon

  const innerPadding = 0;

  // No outline, so we use full dimensions
  const outlineX = 0;
  const outlineY = 0;
  const outlineWidth = width;
  const outlineHeight = height;

  // Fill area sits inside the outline, respecting inner padding.
  const innerHeight = outlineHeight - innerPadding * 2;
  const innerWidth = outlineWidth - innerPadding * 2;

  // Corner radius for rounded corners; clamp to a sensible value relative to height
  const cornerRadius = Math.max(1, Math.min(4, outlineHeight / 4));

  // Map percentage to visual fill: 0% → 0%, 1-100% → 5%-100% for better visibility at low levels
  const visualPercent = percent === 0 ? 0 : 0.05 + (percent * 0.95);

  const svgWidth = width + capWidth + boltSpace;
  // approximate bolt path size for centering and scaling
  const boltPathH = 20;
  const boltScale = 0.65; // Smaller as requested
  const svgHeight = Math.max(height, boltPathH * boltScale);
  const boltTransX = width + capWidth + 1;
  // Center relative to battery height (moves it up compared to centering in expanded SVG)
  const boltTransY = (height - boltPathH * boltScale) / 2;

  return (
    <svg
      className="nc-battery"
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      role="img"
      aria-label={`Battery ${percent === 0 ? '-' : Math.round(percent * 100) + '%'} ${status}`}
    >
      <defs>
        {/* Mask for the fill percentage */}
        <mask id={`nc-battery-fill-mask-${percent}`}>
          <rect x="0" y="0" width={innerWidth * visualPercent} height={innerHeight} fill="white" />
        </mask>

        {/* Define a mask using the text as a cutout */}
        <mask id={`nc-battery-text-mask-${percent}`}>
          {/* White background allows everything through */}
          <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="white" />
          {/* Black text cuts a hole in the mask */}
          <text x={outlineX + outlineWidth / 2} y={height - 3} fontSize={11} fontWeight="bold" fill="black" textAnchor="middle">
            {percent === 0 ? '-' : Math.round(percent * 100)}
          </text>
        </mask>
      </defs>

      {/* Apply mask to all battery elements to create hollow text effect */}
      <g mask={`url(#nc-battery-text-mask-${percent})`}>
        {/* semi-transparent background */}
        <rect
          x={outlineX}
          y={outlineY}
          rx={cornerRadius}
          ry={cornerRadius}
          width={outlineWidth}
          height={outlineHeight}
          fill={backgroundColor}
        />

        {/* filled portion - full width rect with mask to show only the percentage */}
        <rect
          x={outlineX + innerPadding}
          y={outlineY + innerPadding}
          width={innerWidth}
          height={innerHeight}
          fill={fillColor}
          rx={cornerRadius}
          ry={cornerRadius}
          mask={`url(#nc-battery-fill-mask-${percent})`}
        />

        {/* cap */}
        <rect
          x={width + capSpacing}
          y={height * 0.26}
          width={capWidth}
          height={height * 0.48}
          rx={0.8}
          ry={0.8}
          fill={percent === 1 ? fillColor : backgroundColor}
        />

        {/* charging lightning - positioned to the right of the battery (outside the cap) */}
        {status === 'charging' ? (
          <g transform={`translate(${boltTransX}, ${boltTransY}) scale(${boltScale})`} fill={fillColor}>
            {/* lightning symbol (stylized) */}
            <path d="M10 0 L2 11 H8 L5 20 L14 8 H8 L10 0 Z" />
          </g>
        ) : null}
      </g>
    </svg>
  );
}
