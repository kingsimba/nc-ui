import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 2048 icon - Grid with numbered tiles.
 */
export function Game2048Icon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      {/* Background */}
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#bbada0" />

      {/* Grid cells */}
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" fill="#edc22e" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" fill="#f2b179" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" fill="#ede0c8" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" fill="#eee4da" />

      {/* Numbers */}
      <text x="7.25" y="9.5" fontSize="5" fontWeight="bold" fill="#f9f6f2" textAnchor="middle">2K</text>
      <text x="16.75" y="9.5" fontSize="5" fontWeight="bold" fill="#f9f6f2" textAnchor="middle">8</text>
      <text x="7.25" y="19" fontSize="5" fontWeight="bold" fill="#776e65" textAnchor="middle">4</text>
      <text x="16.75" y="19" fontSize="5" fontWeight="bold" fill="#776e65" textAnchor="middle">2</text>
    </svg>
  );
}
