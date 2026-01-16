import { Button } from '../../../src';
import { notificationManager } from '../../../src/lib/notificationManager';

export function NotificationSection() {
    const showSuccess = () => {
        notificationManager.show({
            type: 'success',
            message: 'Your changes have been saved successfully.',
        });
    };

    const showError = () => {
        notificationManager.show({
            type: 'danger',
            message: 'Failed to connect to the server. Please try again.',
        });
    };

    const showWarning = () => {
        notificationManager.show({
            type: 'warning',
            message: 'Your session will expire in 5 minutes.',
        });
    };

    const showInfo = () => {
        notificationManager.show({
            message: 'A new version is available. Refresh to update.',
        });
    };

    const showCustomTitle = () => {
        notificationManager.show({
            title: 'Custom Title',
            type: 'success',
            message: 'This notification has a custom title instead of the default.',
        });
    };

    const showPersistent = () => {
        notificationManager.show({
            type: 'warning',
            message: 'This notification will stay until dismissed manually.',
            lastingTime: 0, // 0 means it won't auto-dismiss
        });
    };

    const showNonDismissible = () => {
        notificationManager.show({
            type: 'danger',
            message: 'This notification cannot be dismissed manually.',
            dismissible: false,
            lastingTime: 3000,
        });
    };

    const showMultiple = () => {
        notificationManager.show({
            type: 'success',
            message: 'First notification',
        });
        setTimeout(() => {
            notificationManager.show({
                type: 'warning',
                message: 'Second notification',
            });
        }, 300);
        setTimeout(() => {
            notificationManager.show({
                type: 'danger',
                message: 'Third notification',
            });
        }, 600);
    };

    return (
        <section className="dev-section">
            <h2>Notification</h2>
            <p className="weak" style={{ marginBottom: '16px' }}>
                Toast-style notifications that appear in the top-left corner and auto-dismiss after 5 seconds by default.
            </p>

            <h3>Basic Types</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <Button onClick={showSuccess}>Success</Button>
                <Button onClick={showError}>Error</Button>
                <Button onClick={showWarning}>Warning</Button>
                <Button onClick={showInfo}>Info</Button>
            </div>

            <h3>Custom Options</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <Button onClick={showCustomTitle}>Custom Title</Button>
                <Button onClick={showPersistent}>Persistent (no auto-dismiss)</Button>
                <Button onClick={showNonDismissible}>Non-dismissible</Button>
            </div>

            <h3>Stacking</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <Button onClick={showMultiple}>Show Multiple</Button>
            </div>

            <h3>API Reference</h3>

            <h4>Setup</h4>
            <p className="weak" style={{ marginBottom: '8px' }}>
                Add <code>{'<NotificationContainer />'}</code> once at the root of your app:
            </p>
            <pre className="code-block" style={{ marginBottom: '24px' }}>{`import { NotificationContainer } from '@kingsimba/nc-ui';

function App() {
  return (
    <>
      <YourApp />
      <NotificationContainer />
    </>
  );
}`}</pre>

            <h4>Usage</h4>
            <p className="weak" style={{ marginBottom: '8px' }}>
                Use <code>notificationManager.show()</code> to display notifications:
            </p>
            <pre className="code-block" style={{ marginBottom: '24px' }}>{`import { notificationManager } from '@kingsimba/nc-ui';

// Basic usage
notificationManager.show({
  message: 'Operation completed',
  type: 'success',
});

// With all options
notificationManager.show({
  title: 'Custom Title',      // Optional: overrides default title
  message: 'Your message',    // Required
  type: 'success',            // 'success' | 'danger' | 'warning' | null
  dismissible: true,          // Default: true
  lastingTime: 5000,          // Default: 5000ms, 0 = never auto-dismiss
});`}</pre>

            <h4>Options</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                        <th style={{ textAlign: 'left', padding: '8px 12px' }}>Property</th>
                        <th style={{ textAlign: 'left', padding: '8px 12px' }}>Type</th>
                        <th style={{ textAlign: 'left', padding: '8px 12px' }}>Default</th>
                        <th style={{ textAlign: 'left', padding: '8px 12px' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                        <td style={{ padding: '8px 12px' }}><code>message</code></td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>string</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>—</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>The notification message (required)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                        <td style={{ padding: '8px 12px' }}><code>title</code></td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>string</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Based on type</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Custom title (auto-generated from type if not set)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                        <td style={{ padding: '8px 12px' }}><code>type</code></td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>'success' | 'danger' | 'warning' | null</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>null (info)</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Visual style of the notification</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                        <td style={{ padding: '8px 12px' }}><code>dismissible</code></td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>boolean</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>true</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Show close button</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '8px 12px' }}><code>lastingTime</code></td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>number</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>5000</td>
                        <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Auto-dismiss delay in ms (0 = never)</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}
