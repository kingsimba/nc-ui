import { Button, type ButtonVariant } from './Button';

export type AlertType = 'warning' | 'error';

export interface AlertProps {
  /** Error or warning code to display */
  code: number;
  /** Alert message text */
  text: string;
  /** Type of alert - determines styling */
  type: AlertType;
  /** Optional action button configuration */
  button?: { text: string; variant?: ButtonVariant };
  /** Callback when action button is clicked */
  onAction?: () => void;
}

export function Alert({ code, text, type, button, onAction }: AlertProps) {
  return (
    <div className={`nc-alert nc-${type}`}>
      <span className={`nc-alert-message nc-${type}`}>
        <span className="nc-alert-code">{code}</span>
        {text}
      </span>

      {button && (
        <span className="nc-alert-action">
          <Button
            size="small"
            variant={button.variant ?? (type === 'error' ? 'danger' : 'warning')}
            onClick={onAction}
          >
            {button.text}
          </Button>
        </span>
      )}
    </div>
  );
}
