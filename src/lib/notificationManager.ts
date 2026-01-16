import {
  addNotification,
  type Notification,
} from '../stores/notificationStore';

export const notificationManager = {
  show: (notification: Omit<Notification, 'id'>): string => {
    return addNotification(notification);
  },
};
