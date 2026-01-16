import { useTranslation } from 'react-i18next';
import { CloseIcon } from './icons/GeneratedIcons';
import { Notification as NotificationType, removeNotification } from '../stores/notificationStore';

interface NotificationProps {
  notification: NotificationType;
}

export function Notification({ notification }: NotificationProps) {
  const { t } = useTranslation();

  // Determine title based on type if not provided
  const getTitle = () => {
    if (notification.title) return notification.title;

    switch (notification.type) {
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
      className={`nc-notification nc-notification-${notification.type || 'info'}`}
    >
      <div className="nc-notification-content">
        <div className="nc-notification-body" style={{ paddingRight: notification.dismissible ? '8px' : '0' }}>
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
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
