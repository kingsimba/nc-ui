import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Start icon - Windows 11-style Start Menu icon with a 4-square grid.
 */
export function StartIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* 4 rounded squares in a 2x2 grid (Windows 11 style) with colors */}
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#0078D4" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#26A0DA" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#005A9E" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#00B7C3" />
    </svg>
  );
}

/**
 * Calculator icon for the Calculator app.
 */
export function CalculatorIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Body */}
      <rect x="4" y="2" width="16" height="20" rx="2" fill="#455A64" />

      {/* Screen */}
      <rect x="6" y="4" width="12" height="5" rx="1" fill="#CFD8DC" />
      <rect x="7" y="5.5" width="10" height="2" rx="0.5" fill="#90A4AE" opacity="0.5" />

      {/* Buttons */}
      {/* Row 1 */}
      <rect x="6.5" y="11" width="2.5" height="2.5" rx="0.5" fill="#78909C" />
      <rect x="10.5" y="11" width="2.5" height="2.5" rx="0.5" fill="#78909C" />
      <rect x="14.5" y="11" width="3" height="2.5" rx="0.5" fill="#FF9800" />

      {/* Row 2 */}
      <rect x="6.5" y="15" width="2.5" height="2.5" rx="0.5" fill="#78909C" />
      <rect x="10.5" y="15" width="2.5" height="2.5" rx="0.5" fill="#78909C" />
      <rect x="14.5" y="15" width="3" height="2.5" rx="0.5" fill="#FF9800" />

      {/* Row 3 */}
      <rect x="6.5" y="19" width="2.5" height="2.5" rx="0.5" fill="#78909C" />
      <rect x="10.5" y="19" width="2.5" height="2.5" rx="0.5" fill="#78909C" />
      <rect x="14.5" y="19" width="3" height="2.5" rx="0.5" fill="#2196F3" />
    </svg>
  );
}

/**
 * Minesweeper (mine/bomb) icon for the Minesweeper app.
 */
export function MinesweeperIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Spikes - Traditional dark grey/black */}
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.9 4.9L7.1 7.1M16.9 16.9L19.1 19.1M4.9 19.1L7.1 16.9M16.9 7.1L19.1 4.9" stroke="#212121" strokeWidth="2" strokeLinecap="round" />

      {/* Main bomb body */}
      <circle cx="12" cy="12" r="7" fill="#212121" />

      {/* Highlights for 3D effect */}
      <circle cx="9.5" cy="9.5" r="2.5" fill="#424242" />
      <circle cx="8.5" cy="8.5" r="1" fill="white" opacity="0.8" />
    </svg>
  );
}

/**
 * Sliders icon - represents adjustable settings (three horizontal sliders)
 */
export function SlidersIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Track 1 */}
      <rect x="4" y="5" width="16" height="2" rx="1" fill="#ECEFF1" />
      <rect x="4" y="5" width="12" height="2" rx="1" fill="#F44336" />
      <circle cx="16" cy="6" r="3" fill="white" stroke="#F44336" strokeWidth="1.5" />

      {/* Track 2 */}
      <rect x="4" y="11" width="16" height="2" rx="1" fill="#ECEFF1" />
      <rect x="4" y="11" width="8" height="2" rx="1" fill="#4CAF50" />
      <circle cx="12" cy="12" r="3" fill="white" stroke="#4CAF50" strokeWidth="1.5" />

      {/* Track 3 */}
      <rect x="4" y="17" width="16" height="2" rx="1" fill="#ECEFF1" />
      <rect x="4" y="17" width="14" height="2" rx="1" fill="#2196F3" />
      <circle cx="18" cy="18" r="3" fill="white" stroke="#2196F3" strokeWidth="1.5" />
    </svg>
  );
}
