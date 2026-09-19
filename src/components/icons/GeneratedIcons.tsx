/**
 * Auto-generated and custom icons for the application.
 */

import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  strokeWidth?: number;
}

/**
 * Close icon - X symbol for closing dialogs, modals, or dismissing content.
 */
export function CloseIcon({ size = 24, color = 'currentColor', strokeWidth = 2, className, style }: IconProps & { color?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * External Link icon - "box with arrow" icon for opening external links.
 */
export function ExternalLinkIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8" />
      <polyline points="17 4 20 4 20 7" />
      <line x1="13" y1="11" x2="20" y2="4" />
    </svg>
  );
}

/**
 * HideApps icon - "Show Desktop" style icon to collapse the right toolbar panel.
 * Similar to Windows "Show Desktop" button.
 */
export function HideAppsIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Desktop/window frame */}
      <rect x="3" y="4" width="18" height="14" rx="2" />
      {/* Desktop stand */}
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="18" x2="12" y2="21" />
      {/* Minimize indicator lines */}
      <line x1="7" y1="11" x2="17" y2="11" />
    </svg>
  );
}

/**
 * View icon - "eye" icon for viewing content.
 */
export function ViewIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Eye outline */}
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      {/* Pupil */}
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/**
 * WiFi icon for the WiFi Setup app.
 * Shows signal arcs indicating wireless connectivity.
 */
export function WifiIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Outer arc */}
      <path d="M1.5 9a15.5 15.5 0 0 1 21 0" />
      {/* Middle arc */}
      <path d="M5 12.5a10 10 0 0 1 14 0" />
      {/* Inner arc */}
      <path d="M8.5 16a5 5 0 0 1 7 0" />
      {/* Center dot */}
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Lock icon for secured WiFi networks.
 */
export function LockIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/**
 * Unlock icon for open WiFi networks (no security).
 */
export function UnlockIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7.83-1" />
    </svg>
  );
}

/**
 * Chevron right icon for navigation items.
 */
export function ChevronRightIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/**
 * Chevron left icon for navigation items.
 */
export function ChevronLeftIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

/**
 * Chevron down icon for expandable sections.
 */
export function ChevronDownIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * Refresh icon for scanning networks.
 * Paths are drawn to the full 24-unit box; do not add viewBox padding here,
 * it scales the glyph (and its stroke) down relative to the rest of the set.
 */
export function RefreshIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Arrow heads are 5 units on each leg, matching RevertIcon's */}
      <path d="M21 3v5h-5" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 21v-5h5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}

/**
 * Revert icon - undo/revert action icon with counter-clockwise arrow.
 */
export function RevertIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

/**
 * Edit icon - Pencil for editing mode.
 * Optically sized to 85%: the pencil fills its box corner-to-corner, so at full
 * size it reads heavier than round icons like InfoIcon.
 */
export function EditIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-2.1 -2.1 28.2 28.2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

/**
 * Trash icon for deleting items.
 */
export function TrashIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

/**
 * Empty folder icon - an open empty folder for empty state display.
 */
export function EmptyFolderIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Open folder back */}
      <path d="M4 4h5l2 2h9a1 1 0 0 1 1 1v2H3V5a1 1 0 0 1 1-1z" />
      {/* Open folder front (angled to show empty interior) */}
      <path d="M2 9h20l-2 11H4L2 9z" />
      {/* Empty indicator - dashed line inside */}
      <path d="M8 14h8" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
}

/**
 * Info icon - circle with "i" for information.
 */
export function InfoIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

/**
 * Question icon - circle with "?" for help and unknown values. Same 10-unit
 * ring as InfoIcon so the two pair cleanly; the hook and dot mirror the "i"
 * stem and dot, leaving a 4-unit gap above the dot in both.
 */
export function QuestionIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/**
 * PieChart icon for statistics/analytics.
 */
export function PieChartIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

/**
 * Power icon for system power management.
 */
export function PowerIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </svg>
  );
}

/**
 * Camera icon for video/image capture functionality.
 * Optically sized to 89%: the body spans the full 24-unit box, so at 1:1 it
 * reads heavier than round icons like InfoIcon.
 */
export function CameraIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-1.5 -1.5 27 27"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

/**
 * Plus icon for zoom in functionality.
 */
export function PlusIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/**
 * Minus icon for zoom out functionality.
 */
export function MinusIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/**
 * DoubleClick icon - Mouse cursor with double-click indicators and movement arrow.
 * Used to enable/disable double-click to move robot feature.
 */
export function DoubleClickIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Ripples */}
      <circle cx="9.5" cy="4" r="2" opacity="0.5" />
      <circle cx="9.5" cy="4" r="3.5" opacity="0.3" />

      {/* Hand */}
      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12" />
      <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
      <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
      <path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-2h.2a6 6 0 0 1-5-2.7l-.2-.3c-.3-.5-1.4-2.4-3.2-6.3l-.5-.8a.6.6 0 0 1 .5-.8h2.5" />
    </svg>
  );
}

/**
 * More icon - Vertical three dots for menu/options.
 * Used to show additional actions or menu.
 */
export function MoreIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}

/**
 * More Horizontal icon - Horizontal three dots for menu/options.
 */
export function MoreHorizontalIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

/**
 * Menu icon - Hamburger button for opening navigation or action menus.
 * Uses a 2.5px stroke: three short bars carry less ink than a full outline,
 * so the slightly heavier weight keeps it level with the rest of the set.
 */
export function MenuIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

/**
 * Eye Hidden icon - "eye with slash" icon for hiding passwords.
 */
export function EyeHiddenIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Eye outline */}
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      {/* Slash line, run corner-to-corner across the eye's vertical extent */}
      <line x1="4" y1="4" x2="20" y2="20" />
    </svg>
  );
}

/**
 * Search icon - Magnifying glass icon for search functionality.
 */
export function SearchIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/**
 * Copy icon - Two overlapping sheets for copy-to-clipboard actions.
 */
export function CopyIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Front sheet */}
      <rect x="8" y="8" width="14" height="14" rx="2" />
      {/* Back sheet, open where the front sheet overlaps */}
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

/**
 * Filter icon - Funnel for narrowing down a list or dataset.
 */
export function FilterIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Funnel: wide rim tapering to a narrow spout. The rim's ~48° corners are
          filleted at r=1.5 so they don't read as sharp spikes. */}
      <path d="M5.33 3H18.67A1.5 1.5 0 0 1 19.79 5.5L14.4 11.6V21L9.6 18.6V11.6L4.21 5.5A1.5 1.5 0 0 1 5.33 3Z" />
    </svg>
  );
}

/**
 * Sun icon - Light theme. Pairs with MoonIcon as a matched toggle set:
 * both fill the same 22x22 ink box with 1 unit of margin on every side.
 */
export function SunIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Disc */}
      <circle cx="12" cy="12" r="4.5" />
      {/* Eight rays at 45° intervals, all spanning radius 7.5 to 10 */}
      <path d="M12 4.5V2" />
      <path d="M19.5 12H22" />
      <path d="M12 19.5V22" />
      <path d="M4.5 12H2" />
      <path d="M17.3 6.7 19.07 4.93" />
      <path d="M6.7 6.7 4.93 4.93" />
      <path d="M6.7 17.3 4.93 19.07" />
      <path d="M17.3 17.3 19.07 19.07" />
    </svg>
  );
}

/**
 * Moon icon - Dark theme. Outer arc is a circle of radius 8.5 rather than the
 * full 10: a crescent is one compact solid mass, so matching the sun's ink area
 * would still make it read heavier than the sun's sparse rays.
 * The bite is a semicircle on the chord, so it reaches the circle's centre.
 */
export function MoonIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M12 3.5a6.01 6.01 0 0 0 8.5 8.5 8.5 8.5 0 1 1-8.5-8.5Z" />
    </svg>
  );
}

/**
 * Save icon - Floppy disk. The body is a rounded square spanning 3 to 21 with a
 * 45° cut across the top-right corner: a solid square silhouette reads heavier
 * than the set's circles and sparse glyphs, so it is held to a 20-unit ink box
 * (2 units of margin per side) and a 1.5 stroke rather than the full 22 and 2.
 */
export function SaveIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Body with the beveled top-right corner */}
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      {/* Label, open where it meets the bottom edge */}
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      {/* Shutter */}
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  );
}

/**
 * Settings icon - Gear. Six lobes joined to the hub by rounded webs rather than
 * straight flanks: the profile is built from 1.963-unit arcs throughout, so the
 * tooth/valley transition carries no straight run and reads soft at every size.
 * 1.5px stroke and a 3.417-unit bore, so the glyph fills the same 22x22 outer
 * box (1 unit of margin per side) as the rest of the set.
 */
export function SettingsIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M10.092 3.25c.485-2 3.33-2 3.815 0a1.963 1.963 0 002.93 1.214c1.757-1.071 3.77.941 2.699 2.699a1.963 1.963 0 001.213 2.929c2 .485 2 3.33 0 3.815a1.963 1.963 0 00-1.214 2.93c1.071 1.757-.941 3.77-2.699 2.699a1.963 1.963 0 00-2.929 1.213c-.485 2-3.33 2-3.815 0a1.963 1.963 0 00-2.93-1.214c-1.757 1.071-3.77-.941-2.699-2.699a1.963 1.963 0 00-1.213-2.929c-2-.485-2-3.33 0-3.815a1.963 1.963 0 001.214-2.93c-1.071-1.757.941-3.77 2.699-2.699 1.134.692 2.615.08 2.929-1.213z" />
      {/* Bore */}
      <path d="M15.417 12a3.417 3.417 0 11-6.833 0 3.417 3.417 0 016.833 0z" />
    </svg>
  );
}

/**
 * Console icon - Terminal window. Same 2-unit margin as SaveIcon: an outer
 * rectangle spanning the full 24-unit box would be the widest silhouette in the
 * set, so the frame is inset to 4..20 (16 units) and reads level with the
 * circles. The prompt chevron and the output underline sit inside the frame.
 */
export function ConsoleIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Window frame */}
      <rect x="4" y="4" width="16" height="16" rx="2" />
      {/* Shell prompt */}
      <path d="m8.5 9.5 2.5 2.5-2.5 2.5" />
      {/* Output line */}
      <path d="M13.5 14.5h2.5" />
    </svg>
  );
}

/**
 * Star icon - Five-pointed star for favourites and ratings. Outer radius 12.92
 * with a 0.45 inner ratio: the classic 0.382 pentagram proportion goes
 * needle-thin once the arms are down at 16px, while anything above ~0.5 starts
 * reading as a pentagon. Each tip carries a real 1.55-unit fillet - a plain
 * strokeLinejoin only softens by half the stroke width, which leaves the points
 * visibly sharp. 1.55 is the largest radius that still leaves 1.42 units of
 * straight edge between neighbouring tips; beyond ~1.85 the fillets collide and
 * the star turns blobby. Sized so the ink box spans the set's full 22 units
 * across rather than the 17.5 a 10-unit radius gives.
 */
export function StarIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M13.43 3.37A1.55 1.55 0 0 0 10.57 3.37L8.58 8.15L3.44 8.56A1.55 1.55 0 0 0 2.54 11.29L6.47 14.65L5.27 19.67A1.55 1.55 0 0 0 7.58 21.36L12 18.66L16.42 21.36A1.55 1.55 0 0 0 18.73 19.67L17.53 14.65L21.46 11.29A1.55 1.55 0 0 0 20.56 8.56L15.42 8.15Z" />
    </svg>
  );
}