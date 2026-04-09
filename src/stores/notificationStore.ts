export type NotificationType = 'warning' | 'danger' | 'success' | 'info' | null;

export interface Notification {
  id: string;
  title?: string;
  message: string;
  type?: NotificationType;
  dismissible?: boolean;
  duration?: number; // in milliseconds
  isRemoving?: boolean; // Internal flag for fade animation
}

export interface NotificationOptions {
  title?: string;
  message: string;
  type?: NotificationType | 'error';
  dismissible?: boolean;
  duration?: number;
}

type Subscriber = (notifications: Notification[]) => void;

let state: { notifications: Notification[] } = { notifications: [] };
const subscribers = new Set<Subscriber>();
const removalTimeouts = new Map<string, number>();

function notify() {
  const snap = state.notifications.slice();
  for (const s of Array.from(subscribers)) {
    try {
      s(snap);
    } catch (e) {
      // ignore subscriber errors
    }
  }
}

export function subscribe(fn: Subscriber) {
  subscribers.add(fn);
  try {
    fn(state.notifications.slice());
  } catch (e) {
    // ignore
  }
  return () => {
    subscribers.delete(fn);
  };
}

export function addNotification(notification: NotificationOptions): string {
  const id = `notification-${Date.now()}-${Math.random()}`;
  const { duration, type, ...rest } = notification;
  const newNotification: Notification = {
    id,
    dismissible: true,
    ...rest,
    type: type === 'error' ? 'danger' : (type ?? 'info'),
    duration: duration ?? 5000,
  };

  state.notifications = [newNotification, ...state.notifications];
  notify();

  // Auto-remove after duration if specified
  if (newNotification.duration && newNotification.duration > 0) {
    setTimeout(() => {
      removeNotification(id);
    }, newNotification.duration);
  }

  return id;
}

export function removeNotification(id: string): void {
  // Mark notification as removing (for fade animation)
  const notification = state.notifications.find((n) => n.id === id);
  if (!notification) return;

  notification.isRemoving = true;
  notify();

  // Actually remove after animation duration
  const timeoutId = window.setTimeout(() => {
    state.notifications = state.notifications.filter((n) => n.id !== id);
    notify();
    removalTimeouts.delete(id);
  }, 300); // Match the CSS transition duration

  removalTimeouts.set(id, timeoutId);
}
