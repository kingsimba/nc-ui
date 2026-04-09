import React from 'react';
import { Button, type ButtonVariant } from './Button';
import { CloseIcon } from './icons';

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'danger';

export interface AlertActionButton {
  /** Button text */
  text: string;
  /** Optional button variant override */
  variant?: ButtonVariant;
}

export interface AlertProps {
  /** Optional code shown before the message in the legacy alert layout */
  code?: number | string;
  /** Optional alert message text for the legacy alert layout */
  text?: string;
  /** Visual style of the alert */
  type: AlertType;
  /** Optional action button configuration */
  button?: AlertActionButton;
  /** Callback when the action button is clicked */
  onAction?: () => void;
  /** Optional inline content. When provided, it replaces the legacy code/text layout. */
  children?: React.ReactNode;
  /** Optional close handler. When provided, a dismiss button is shown. */
  onClose?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const alertButtonVariantByType: Record<AlertType, ButtonVariant> = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'danger',
  danger: 'danger',
};

export function Alert({
  code,
  text,
  type,
  button,
  onAction,
  children,
  onClose,
  className = '',
  style,
}: AlertProps) {
  const content = children ?? (
    <>
      {code !== undefined && <span className="nc-alert-code">{code}</span>}
      {text}
    </>
  );

  return (
    <div className={`nc-alert nc-${type} ${className}`.trim()} style={style}>
      <div className="nc-alert-main">
        <div className={`nc-alert-message nc-${type}`}>{content}</div>
        {onClose && (
          <button
            type="button"
            className="nc-alert-close"
            aria-label="Close alert"
            onClick={onClose}
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>

      {button && (
        <span className="nc-alert-action">
          <Button
            size="small"
            variant={button.variant ?? alertButtonVariantByType[type]}
            onClick={onAction}
          >
            {button.text}
          </Button>
        </span>
      )}
    </div>
  );
}
