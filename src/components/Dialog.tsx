import React, { createContext, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Button, ButtonProps } from './Button';
import { CloseButton } from './CommonButtons';

export type DialogFooterType = 'ok' | 'ok-cancel' | 'save-cancel' | 'delete-cancel' | 'connect' | 'close' | 'gotit' | 'custom' | 'none';

// Dialog context for children to access dialog functions
interface DialogContextValue {
  /** Close the dialog */
  close: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

/**
 * Hook to access dialog context from within a Dialog.
 * Returns the dialog context with close() and other functions.
 * @throws Error if used outside of a Dialog component
 */
export function useDialog(): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error('useDialog must be used inside a Dialog component');
  }
  return ctx;
}

/**
 * A button that automatically closes the parent Dialog when clicked.
 * Accepts all Button props. Default children uses i18n 'common.close'.
 */
export function DialogClose({ children, onClick, ...props }: ButtonProps) {
  const { close } = useDialog();
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    close();
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children ?? t('common.close')}
    </Button>
  );
}

export interface DialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Called when the dialog should close */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Dialog content */
  children: React.ReactNode;
  /** Custom style for the dialog container */
  style?: React.CSSProperties;
  /** Footer button preset type */
  footerType?: DialogFooterType;
  /** Custom footer content (used when footerType is 'custom') */
  footer?: React.ReactNode;
  /** Called when OK button is clicked */
  onOk?: () => void;
  /** Called when Save button is clicked */
  onSave?: () => void;
  /** Called when Delete button is clicked */
  onDelete?: () => void;
  /** Called when Cancel button is clicked */
  onCancel?: () => void;
  /** Called when Connect button is clicked */
  onConnect?: () => void;
  /** Whether clicking the overlay closes the dialog (default: true) */
  closeOnOverlay?: boolean;
  /** Whether the primary action button is disabled */
  primaryDisabled?: boolean;
  /** 
   * Whether to render the dialog in a portal covering the full viewport (default: false).
   * Set to true to use fixed positioning via portal to document.body.
   * Set to false to render inline with absolute positioning within parent container.
   */
  fullScreen?: boolean;
  /** Whether to hide the title bar (default: false) */
  hideTitleBar?: boolean;
  /** Additional CSS class for the dialog container */
  className?: string;
}

/**
 * A reusable modal dialog component with overlay.
 * Renders in a portal to ensure proper z-index stacking.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  style,
  footerType = 'ok-cancel',
  footer,
  onOk,
  onSave,
  onDelete,
  onCancel,
  onConnect,
  closeOnOverlay = true,
  primaryDisabled = false,
  fullScreen = false,
  hideTitleBar = false,
  className = '',
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Context value for children to access
  const contextValue: DialogContextValue = { close: onClose };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Focus trap - focus dialog when opened
  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  // Render footer based on footerType
  const renderFooter = () => {
    switch (footerType) {
      case 'ok':
        return (
          <div className="nc-dialog-footer">
            <Button variant="primary" onClick={onOk ?? onClose} disabled={primaryDisabled}>
              {t('common.ok')}
            </Button>
          </div>
        );
      case 'ok-cancel':
        return (
          <div className="nc-dialog-footer">
            <Button variant="primary" onClick={onOk ?? onClose} disabled={primaryDisabled}>
              {t('common.ok')}
            </Button>
            <DialogClose onClick={onCancel}>
              {t('common.cancel')}
            </DialogClose>
          </div>
        );
      case 'save-cancel':
        return (
          <div className="nc-dialog-footer">
            <Button variant="primary" onClick={onSave} disabled={primaryDisabled}>
              {t('common.save')}
            </Button>
            <DialogClose onClick={onCancel}>
              {t('common.cancel')}
            </DialogClose>
          </div>
        );
      case 'delete-cancel':
        return (
          <div className="nc-dialog-footer">
            <Button variant="danger" onClick={onDelete} disabled={primaryDisabled}>
              {t('common.delete')}
            </Button>
            <DialogClose onClick={onCancel}>
              {t('common.cancel')}
            </DialogClose>
          </div>
        );
      case 'connect':
        return (
          <div className="nc-dialog-footer">
            <Button variant="primary" onClick={onConnect} disabled={primaryDisabled}>
              {t('common.connect')}
            </Button>
            <DialogClose onClick={onCancel}>
              {t('common.cancel')}
            </DialogClose>
          </div>
        );
      case 'close':
        return (
          <div className="nc-dialog-footer">
            <DialogClose variant="primary" />
          </div>
        );
      case 'gotit':
        return (
          <div className="nc-dialog-footer">
            <DialogClose variant="primary">
              {t('common.gotit')}
            </DialogClose>
          </div>
        );
      case 'custom':
        return <div className="nc-dialog-footer">{footer}</div>;
      case 'none':
        return null;
      default:
        return null;
    }
  };

  const dialogContent = (
    <DialogContext.Provider value={contextValue}>
      <div className={`nc-dialog-overlay${fullScreen ? ' nc-fullscreen' : ''}`} onClick={handleOverlayClick}>
        <div
          ref={dialogRef}
          className={`nc-dialog-container ${className}`}
          style={style}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={hideTitleBar ? undefined : "nc-dialog-title"}
        >
          {!hideTitleBar && (
            <div className="nc-dialog-header">
              <h3 id="nc-dialog-title" className="nc-dialog-title">{title}</h3>
              <CloseButton onClick={onClose} aria-label="Close dialog" />
            </div>
          )}
          <div className="nc-dialog-content">
            {children}
          </div>
          {renderFooter()}
        </div>
      </div>
    </DialogContext.Provider>
  );

  // Render in a portal (default) for proper viewport positioning, or inline if fullScreen=false
  if (fullScreen) {
    return createPortal(dialogContent, document.body);
  }
  return dialogContent;
}
