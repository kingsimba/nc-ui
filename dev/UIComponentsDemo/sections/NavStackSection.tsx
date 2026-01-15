import { Button, runningAppsStore } from '../../../src';

// ============================================================================
// Main Export
// ============================================================================

export function NavStackSection() {
    const launchDemo = () => {
        runningAppsStore.launchApp('navstack-demo');
    };

    return (
        <>
            <section className="dev-section">
                <h2>NavStack</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    NavStack provides stack-based navigation for apps running inside AppContainer.
                    It uses the AppContainer's title bar to show the current view title and back button.
                    Commonly used with ListGroup to create mobile-style settings interfaces.
                </p>

                <h3 style={{ marginBottom: 8, marginTop: 24 }}>How it Works</h3>
                <ul style={{ color: 'var(--nc-text-weak)', marginBottom: 16, paddingLeft: 20 }}>
                    <li>AppContainer provides the title bar and AppContext</li>
                    <li>NavStackProvider uses <code>useApp()</code> to control the title bar</li>
                    <li>When you <code>push()</code> a view, the title updates and back button appears</li>
                    <li>Back button calls <code>pop()</code> to return to the previous view</li>
                    <li>Views remain mounted to preserve state</li>
                </ul>

                <h3 style={{ marginBottom: 12 }}>Live Demo</h3>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)', fontSize: 14 }}>
                    Click the button below to launch a Settings app that demonstrates NavStack
                    with ListGroup navigation. Try navigating to Wi-Fi → Network Detail,
                    or Security → Change Password.
                </p>

                <Button variant="primary" onClick={launchDemo}>
                    Launch Settings Demo
                </Button>
            </section>

            <section className="dev-section">
                <h2>Usage</h2>
                <pre style={{
                    background: 'var(--nc-bg-secondary)',
                    padding: 16,
                    borderRadius: 8,
                    overflow: 'auto',
                    fontSize: 13,
                    lineHeight: 1.5,
                }}>
                    {`// 1. Register your app (it will be rendered inside AppContainer)
appRegistry.register({
  id: 'my-settings',
  titleKey: 'settings.title',
  component: SettingsApp,
});

// 2. Your app component uses NavStackProvider
function SettingsApp() {
  return (
    <NavStackProvider rootView={{
      id: 'home',
      titleKey: 'settings.home',
      component: <HomeView />
    }}>
      <NavStackContainer />
    </NavStackProvider>
  );
}

// 3. Views use useNavStack() to navigate
function HomeView() {
  const { push } = useNavStack();

  return (
    <ListGroup title="Settings">
      <ListGroupItem onClick={() => push({
        id: 'wifi',
        title: 'Wi-Fi',
        component: <WifiView />
      })}>
        <span>Wi-Fi</span>
        <ChevronRightIcon />
      </ListGroupItem>
    </ListGroup>
  );
}`}
                </pre>
            </section>

            <section className="dev-section">
                <h2>API Reference</h2>

                <h3 style={{ marginTop: 16, marginBottom: 8 }}>useNavStack()</h3>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: 14,
                }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Method/Property</th>
                            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                            <td style={{ padding: '8px 12px' }}><code>push(view)</code></td>
                            <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Push a new view onto the stack</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                            <td style={{ padding: '8px 12px' }}><code>pop()</code></td>
                            <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Go back one level</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                            <td style={{ padding: '8px 12px' }}><code>reset()</code></td>
                            <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Reset to root view</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                            <td style={{ padding: '8px 12px' }}><code>depth</code></td>
                            <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Current stack depth (1 = root)</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                            <td style={{ padding: '8px 12px' }}><code>canGoBack</code></td>
                            <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Whether back navigation is possible</td>
                        </tr>
                    </tbody>
                </table>

                <h3 style={{ marginTop: 24, marginBottom: 8 }}>useNavView()</h3>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: 14,
                }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Method</th>
                            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                            <td style={{ padding: '8px 12px' }}><code>setToolbar(node)</code></td>
                            <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Set toolbar for this view</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--nc-border)' }}>
                            <td style={{ padding: '8px 12px' }}><code>clearToolbar()</code></td>
                            <td style={{ padding: '8px 12px', color: 'var(--nc-text-weak)' }}>Clear the toolbar</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );
}
