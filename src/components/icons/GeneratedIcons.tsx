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
 * The box corners are cut at r=3 to match EditIcon's sheet; both are large flat
 * shapes seen three corners at a time, so they share the softer radius. The box
 * stays open along the top-right where the arrow leaves it. The stroke is 1.7
 * rather than 2 so it renders as thick as EditIcon's, whose 28.2-wide viewBox
 * already thins its 2-unit stroke to the same weight.
 */
export function ExternalLinkIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M18 13v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h7" />
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
 * Key icon - Ring bow on the left, blade with two teeth on the right. The bow
 * is r=4 so its 2-unit stroke stops at x=2, level with LockIcon's left edge,
 * and the blade starts at x=11, the inner edge of that ring band, so it meets
 * the hole exactly and leaves the full 6-unit opening. The teeth stop at y=15,
 * short of the bow's own bottom edge at 16, so the blade stays the lowest ink.
 */
export function KeyIcon({ size = 24, className, style }: IconProps) {
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
      {/* Bow */}
      <circle cx="7" cy="12" r="4" />
      {/* Blade */}
      <path d="M11 12h10" />
      {/* Teeth */}
      <path d="M15.5 12v3" />
      <path d="M18.5 12v3" />
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
 * Refresh icon for scanning networks. Two 8-unit arcs with 4.44-unit arrow heads,
 * held to an 18x18 ink box rather than filling the frame. Keep the arcs and heads
 * scaled together.
 */
export function RefreshIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Arrow heads are 4.44 units on each leg, matching RevertIcon's */}
      <path d="M20 4v4.44h-4.44" />
      <path d="M4 12A8 8 0 0 1 17.33 6.04L20 8.44" />
      <path d="M4 20v-4.44h4.44" />
      <path d="M20 12A8 8 0 0 1 6.67 17.96L4 15.56" />
    </svg>
  );
}

/**
 * Revert icon - undo/revert action icon with counter-clockwise arrow. An 8-unit
 * circle with the same 4.44-unit head as RefreshIcon, on the shared 18x18 ink box.
 */
export function RevertIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M4 12A8 8 0 1 0 12 4A8.67 8.67 0 0 0 6.01 6.44L4 8.44" />
      <path d="M4 4v4.44h4.44" />
    </svg>
  );
}

/**
 * Edit icon - Document with a pencil for editing mode.
 * Optically sized to 85%: the sheet fills its box corner-to-corner, so at full
 * size it reads heavier than round icons like InfoIcon. The sheet's corners are
 * cut at r=3 rather than the set's usual 2 - three of them are visible at once on
 * a large flat shape, so the softer radius keeps it from reading as a hard box.
 * The sheet stays open along the top-right because the pencil crosses there.
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
      <path d="M11 4H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6" />
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
      strokeWidth={1.7}
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
      strokeWidth={1.7}
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
 * Info icon - circle with "i" for information. The dot is a filled 1.2-radius
 * circle rather than a zero-length round-capped line, which can never exceed the
 * 2-unit stroke width. stroke="none" is required: the circle would otherwise
 * inherit the parent's 2-unit stroke and render at more than double this size.
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
      <circle cx="12" cy="8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Question icon - circle with "?" for help and unknown values. Same 10-unit
 * ring as InfoIcon so the two pair cleanly; the hook and dot mirror the "i"
 * stem and dot, with the same 1.2-radius filled dot and 4 units between dot
 * centre and the glyph above it.
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
      <circle cx="12" cy="17" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * PieChart icon for statistics/analytics. A 10-unit radius circle, so the 1.7
 * stroke lands it on the set's 21.7x21.7 ink box.
 */
export function PieChartIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
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
/**
 * Copy icon - Two overlapping sheets for copy-to-clipboard actions. Scaled to a
 * 16-unit canvas (18x18 ink): the two-square silhouette is the widest shape in
 * the set, so at full size it reads heavier than the single-mass icons beside it.
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
      <rect x="8.8" y="8.8" width="11.2" height="11.2" rx="1.6" />
      {/* Back sheet, open where the front sheet overlaps */}
      <path d="M5.6 15.2c-.88 0-1.6-.72-1.6-1.6V5.6c0-.88.72-1.6 1.6-1.6h8c.88 0 1.6.72 1.6 1.6" />
    </svg>
  );
}

/**
 * Download icon - Arrow over a baseline, for saving to disk. The tray is reduced
 * to a single line: an open dish needs two verticals and two corner arcs to say
 * the same thing, and at 16px those melt into the baseline anyway. The line spans
 * the same 3 to 21 as the old tray, so the 20x20 ink box is unchanged; the arrow
 * runs 3 to 17, leaving 4 units of clearance above the line.
 */
export function DownloadIcon({ size = 24, className, style }: IconProps) {
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
      {/* Baseline */}
      <path d="M3 21h18" />
      {/* Shaft and head, stopping clear of the line */}
      <path d="M12 3v14" />
      <path d="M7 12l5 5 5-5" />
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
 * Sun icon, filled - SunIcon with the disc painted, so the glyph carries the
 * identical geometry, stroke and 22x22 outline. Only the disc has area; the rays
 * are zero-width lines, so filling leaves them exactly as they were.
 */
export function SunFilledIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
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
 * Moon icon, filled - MoonIcon with the crescent painted. Same geometry, stroke
 * and outline as MoonIcon; filling only closes the crescent's interior.
 */
export function MoonFilledIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
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
 * (2 units of margin per side) rather than the full 22.
 */
export function SaveIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
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
 * 1.7px stroke and a 3.417-unit bore, so the 20.5-unit gear fills a 22.2x22.2
 * outer box - just over the set's usual 22, and level with it at any real size.
 */
export function SettingsIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
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
 * User icon - Single person: a 4.47-radius head over a shoulder shape left open
 * along the bottom edge. Sized so the ink box comes to 19.6x21.8 - the set's
 * full-size height, with the narrower width a person silhouette carries.
 */
export function UserIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Head */}
      <circle cx="12" cy="6.42" r="4.47" />
      {/* Shoulders, open along the bottom edge */}
      <path d="M20.94 22.05v-2.23a4.47 4.47 0 0 0-4.47-4.47H7.53a4.47 4.47 0 0 0-4.47 4.47v2.23" />
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

/**
 * Star icon, filled - StarIcon's star with the interior painted, but with a
 * tighter 1.2-unit tip fillet: a solid body shows the tip shape the way no
 * stroke does, so 1.55 reads as blobby once filled. The star radius drops to
 * 12.36 to hold the tips exactly where the 1.55 version had them, leaving the
 * outline and the 21.85x20.88 ink box unchanged.
 */
export function StarFilledIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M13.11 3.14A1.2 1.2 0 0 0 10.89 3.14L8.73 8.33L3.12 8.78A1.2 1.2 0 0 0 2.44 10.89L6.71 14.55L5.41 20.02A1.2 1.2 0 0 0 7.2 21.32L12 18.39L16.8 21.32A1.2 1.2 0 0 0 18.59 20.02L17.29 14.55L21.56 10.89A1.2 1.2 0 0 0 20.88 8.78L15.27 8.33Z" />
    </svg>
  );
}

/**
 * Play icon - Right-pointing triangle for starting playback. The outline sits on
 * the same 17x20 footprint as PlayFilledIcon: the 1.7 stroke adds 0.85 of ink per
 * side, so the geometry is offset 0.15 further out than the 2-stroke version and
 * the fillet radii grow by the same 0.15, keeping the outer silhouette identical.
 */
export function PlayIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M4.79 4.8A1.92 1.95 0 0 1 7.71 3.14L19.18 10.34A1.92 1.95 0 0 1 19.18 13.66L7.71 20.86A1.92 1.95 0 0 1 4.79 19.2Z" />
    </svg>
  );
}

/**
 * Pause icon - Two vertical bars, sized to the 16x20 footprint of
 * PauseFilledIcon so the outline matches the solid version. The 1.7 stroke costs
 * 0.15 of ink per side, so the bars sit that much wider and the fillets grow with
 * them, holding the outer silhouette where the 2-stroke version had it.
 */
export function PauseIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M4.85 4.8A1.9 1.95 0 0 1 6.75 2.85L7.63 2.85A1.9 1.95 0 0 1 9.53 4.8L9.53 19.2A1.9 1.95 0 0 1 7.63 21.15L6.75 21.15A1.9 1.95 0 0 1 4.85 19.2Z" />
      <path d="M14.47 4.8A1.9 1.95 0 0 1 16.37 2.85L17.25 2.85A1.9 1.95 0 0 1 19.15 4.8L19.15 19.2A1.9 1.95 0 0 1 17.25 21.15L16.37 21.15A1.9 1.95 0 0 1 14.47 19.2Z" />
    </svg>
  );
}

/**
 * Stop icon - Square. Sized to the 16x16 footprint of StopFilledIcon; the 1.7
 * stroke costs 0.15 of ink per side, so the square and its fillets are drawn that
 * much wider to hold the silhouette.
 */
export function StopIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M4.85 6.75A1.9 1.9 0 0 1 6.75 4.85L17.25 4.85A1.9 1.9 0 0 1 19.15 6.75L19.15 17.25A1.9 1.9 0 0 1 17.25 19.15L6.75 19.15A1.9 1.9 0 0 1 4.85 17.25Z" />
    </svg>
  );
}

/**
 * Play icon, filled - same filleted triangle as PlayIcon with the interior
 * painted instead of stroked, so it carries the same 17x20 footprint with no
 * stroke to inset.
 */
export function PlayFilledIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M4 4A2 2 0 0 1 7.05 2.3L20.05 10.3A2 2 0 0 1 20.05 13.7L7.05 21.7A2 2 0 0 1 4 20Z" />
    </svg>
  );
}

/**
 * Pause icon, filled - the two bars of PauseIcon, solid (16x20 ink).
 */
export function PauseFilledIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M4 4A2 2 0 0 1 6 2L7 2A2 2 0 0 1 9 4L9 20A2 2 0 0 1 7 22L6 22A2 2 0 0 1 4 20Z" />
      <path d="M15 4A2 2 0 0 1 17 2L18 2A2 2 0 0 1 20 4L20 20A2 2 0 0 1 18 22L17 22A2 2 0 0 1 15 20Z" />
    </svg>
  );
}

/**
 * Stop icon, filled - the StopIcon square, solid (16x16 ink).
 */
export function StopFilledIcon({ size = 24, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M4 6A2 2 0 0 1 6 4L18 4A2 2 0 0 1 20 6L20 18A2 2 0 0 1 18 20L6 20A2 2 0 0 1 4 18Z" />
    </svg>
  );
}