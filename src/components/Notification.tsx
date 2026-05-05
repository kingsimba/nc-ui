import { useTranslation } from 'react-i18next';
import { CloseIcon } from './icons/GeneratedIcons';
import { Notification as NotificationType, removeNotification } from '../stores/notificationStore';

interface NotificationProps {
  notification: NotificationType;
}

function NotificationStatusIcon({ type }: { type: NotificationType['type'] }) {
  switch (type) {
    case 'success':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M5 10.5l3.1 3.1L15 6.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'danger':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M10 6.5v4.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="13.75" r="1" fill="currentColor" />
        </svg>
      );
    case 'warning':
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M10 3.5 16 15H4L10 3.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M10 7.5v3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="13.25" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M10 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="6.5" r="1" fill="currentColor" />
        </svg>
      );
  }
}

export function Notification({ notification }: NotificationProps) {
  const { t } = useTranslation();
  const type = notification.type || 'info';

  // Determine title based on type if not provided
  const getTitle = () => {
    if (notification.title) return notification.title;

    switch (type) {
      case 'success':
        return t('common.success');
      case 'danger':
        return t('common.error');
      case 'warning':
        return t('common.warning');
      default:
        return t('common.info');
    }
  };

  const handleDismiss = () => {
    removeNotification(notification.id);
  };

  return (
    <div
      className={`nc-notification nc-notification-${type}`}
    >
      <div className="nc-notification-content">
        <div className={`nc-notification-icon nc-notification-icon-${type}`}>
          <NotificationStatusIcon type={type} />
        </div>
        <div className="nc-notification-body">
          <div className="nc-notification-title">
            {getTitle()}
          </div>
          <div className="nc-notification-message">
            {notification.message}
          </div>
        </div>
        {notification.dismissible && (
          <button
            className="nc-notification-dismiss"
            onClick={handleDismiss}
            aria-label={t('common.close')}
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
