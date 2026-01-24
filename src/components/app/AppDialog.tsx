import React from 'react';
import { createPortal } from 'react-dom';
import { AppContainer } from './AppContainer';

export interface AppDialogProps {
  /** The app ID to render */
  appId: string;
  /** Whether the dialog is open */
  open: boolean;
  /** Called when the dialog should close */
  onClose: () => void;
  /** Whether clicking the backdrop closes the dialog (default: false) */
  closeOnBackdrop?: boolean;
  /** Optional CSS class name for the dialog container */
  className?: string;
  /** Custom style for the dialog container */
  style?: React.CSSProperties;
}

/**
 * Renders an app in a fullscreen portal overlay without using the Dialog component.
 * Uses AppContainer directly to preserve all app functionality (title bar, AppContext, back handlers).
 */
export function AppDialog({
  appId,
  open,
  onClose,
  closeOnBackdrop = false,
  className = '',
  style,
}: AppDialogProps) {
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  const content = (
    <div
      className="nc-dialog-overlay nc-fullscreen"
      onClick={handleBackdropClick}
    >
      <div
        className={`nc-app-dialog-container ${className}`}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <AppContainer
          appId={appId}
          isActive={true}
          onClose={onClose}
        />
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
