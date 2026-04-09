import {
  addNotification,
  type NotificationOptions,
} from '../stores/notificationStore';

export function showNotification(notification: NotificationOptions): string {
  return addNotification(notification);
}

export const notificationManager = {
  show: (notification: NotificationOptions): string => {
    return showNotification(notification);
  },
};
