import React from 'react';
import { CloseButton } from '../CommonButtons';

interface AppTitleBarProps {
  title: string;
  onClose: () => void;
  /** If provided, shows a back arrow button on the left */
  onBack?: () => void;
  /** Optional toolbar content to render on the right side (before close button) */
  toolbar?: React.ReactNode;
  /** Whether to hide the back button even when onBack is provided (useful for edit mode) */
  hideBackButton?: boolean;
}

/**
 * Back arrow icon for navigation
 */
function BackArrowIcon({ size = 16 }: { size?: number }) {
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
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

/**
 * Title bar component for launched applications.
 * Displays the app title, optional back button, optional toolbar, and a close button.
 */
export function AppTitleBar({ title, onClose, onBack, toolbar, hideBackButton }: AppTitleBarProps) {
  const showBackButton = onBack && !hideBackButton;

  return (
    <div className="nc-app-title-bar">
      <div className="nc-app-title-bar-left">
        {showBackButton && (
          <button
            className="nc-app-title-bar-back"
            onClick={onBack}
            title="Back"
            aria-label="Go back"
          >
            <BackArrowIcon size={16} />
          </button>
        )}
        <span className="nc-app-title-bar-title">{title}</span>
      </div>
      <div className="nc-app-title-bar-right">
        {toolbar && <div className="nc-app-title-bar-toolbar">{toolbar}</div>}
        <CloseButton onClick={onClose} aria-label="Close application" />
      </div>
    </div>
  );
}
