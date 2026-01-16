import { useEffect, useState, useRef } from 'react';
import { subscribe, Notification as NotificationType } from '../stores/notificationStore';
import { Notification } from './Notification';

export function NotificationContainer() {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [positions, setPositions] = useState<Map<string, number>>(new Map());
    const [entering, setEntering] = useState<Set<string>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);
    const prevNotificationsRef = useRef<NotificationType[]>([]);

    useEffect(() => {
        const unsubscribe = subscribe((notifs) => {
            // Detect new notifications
            const prevIds = new Set(prevNotificationsRef.current.map(n => n.id));
            const newIds = notifs.filter(n => !prevIds.has(n.id)).map(n => n.id);

            if (newIds.length > 0) {
                // Add new notifications immediately
                setNotifications(notifs);
                setEntering(new Set(newIds));

                // Trigger animation on next frame
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setEntering(new Set());
                    });
                });
            } else {
                setNotifications(notifs);
            }

            prevNotificationsRef.current = notifs;
        });
        return unsubscribe;
    }, []);

    // Calculate positions for each notification based on their rendered heights
    useEffect(() => {
        if (!containerRef.current) return;

        const newPositions = new Map<string, number>();
        let currentY = 0;

        const children = containerRef.current.children;

        // Calculate positions for all notifications
        notifications.forEach((notif, index) => {
            newPositions.set(notif.id, currentY);
            if (children[index]) {
                const height = (children[index] as HTMLElement).offsetHeight;
                // Only add gap if not removing (collapsing space)
                if (!notif.isRemoving) {
                    currentY += height + 12; // 12px gap between notifications
                }
            }
        });

        setPositions(newPositions);
    }, [notifications]);

    return (
        <div
            style={{
                position: 'fixed',
                top: '16px',
                left: '16px',
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        >
            <div
                ref={containerRef}
                style={{
                    pointerEvents: 'auto',
                    position: 'relative',
                }}
            >
                {notifications.map((notification) => {
                    const isEntering = entering.has(notification.id);
                    const isLeaving = notification.isRemoving;
                    const targetY = positions.get(notification.id) || 0;

                    return (
                        <div
                            key={notification.id}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                transform: isEntering
                                    ? `translateY(-120px)`
                                    : `translateY(${targetY}px)`,
                                // Only animate transform when not leaving, animate opacity always
                                transition: isLeaving
                                    ? 'opacity 300ms ease-out'
                                    : 'transform 300ms ease-out, opacity 300ms ease-out',
                                opacity: isLeaving ? 0 : 1,
                                width: '100%',
                            }}
                        >
                            <Notification notification={notification} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
