import { useState } from 'react'
import { Tabs, Button, Input, RefreshButton } from '../../../src'

export function TabsSection() {
    const [activeTab, setActiveTab] = useState('Overview')
    const [toolbarActiveTab, setToolbarActiveTab] = useState('Home')
    const [verticalLeftTab, setVerticalLeftTab] = useState('Dashboard')
    const [verticalRightTab, setVerticalRightTab] = useState('Profile')
    const [searchValue, setSearchValue] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const simulateRefresh = () => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1500)
    }

    return (
        <>
            <section className="dev-section">
                <h2>Basic Tabs (Horizontal)</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    When there are many tabs, horizontal scrolling is enabled with scroll indicators
                </p>
                <div className="dev-col">
                    <div style={{ maxWidth: 400, border: '1px solid var(--nc-border)', borderRadius: 8, overflow: 'hidden' }}>
                        <Tabs
                            tabs={['Overview', 'Details', 'Settings', 'Analytics', 'Reports', 'Users', 'Permissions', 'Logs']}
                            active={activeTab}
                            onChange={setActiveTab}
                        />
                    </div>
                    <div style={{ padding: 16, background: 'var(--nc-button-bg)', borderRadius: 8 }}>
                        Content for: {activeTab}
                    </div>
                </div>
            </section>

            <section className="dev-section">
                <h2>Vertical Tabs (Left Aligned)</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    Tabs displayed vertically on the left side with left-aligned text
                </p>
                <div style={{
                    display: 'flex',
                    border: '1px solid var(--nc-border)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    height: 200,
                }}>
                    <Tabs
                        tabs={['Dashboard', 'Analytics', 'Reports', 'Settings', 'Help']}
                        active={verticalLeftTab}
                        onChange={setVerticalLeftTab}
                        orientation="verticalLeft"
                    />
                    <div style={{ flex: 1, padding: 20, background: 'var(--nc-bg-text)' }}>
                        <h3>{verticalLeftTab}</h3>
                        <p>Content for the {verticalLeftTab} tab.</p>
                    </div>
                </div>
            </section>

            <section className="dev-section">
                <h2>Vertical Tabs (Right Aligned)</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    Tabs displayed vertically on the right side with right-aligned text
                </p>
                <div style={{
                    display: 'flex',
                    border: '1px solid var(--nc-border)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    height: 200,
                }}>
                    <div style={{ flex: 1, padding: 20, background: 'var(--nc-bg-text)' }}>
                        <h3>{verticalRightTab}</h3>
                        <p>Content for the {verticalRightTab} tab.</p>
                    </div>
                    <Tabs
                        tabs={['Profile', 'Account', 'Privacy', 'Notifications']}
                        active={verticalRightTab}
                        onChange={setVerticalRightTab}
                        orientation="verticalRight"
                    />
                </div>
            </section>

            <section className="dev-section">
                <h2>Tabs with Toolbar</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    Tabs combined with a toolbar for application controls using the toolbar prop
                </p>
                <div style={{
                    border: '1px solid var(--nc-border)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: 'var(--nc-bg)',
                }}>
                    <Tabs
                        tabs={['Home', 'Settings', 'About']}
                        active={toolbarActiveTab}
                        onChange={setToolbarActiveTab}
                        toolbar={
                            <>
                                {/* Home Tab Toolbar */}
                                {toolbarActiveTab === 'Home' && (
                                    <>
                                        <Input
                                            value={searchValue}
                                            onChange={setSearchValue}
                                            placeholder="Search..."
                                            size="small"
                                            style={{ width: 150 }}
                                        />
                                        <RefreshButton onClick={simulateRefresh} loading={refreshing} size="small" />
                                    </>
                                )}

                                {/* Settings Tab Toolbar */}
                                {toolbarActiveTab === 'Settings' && (
                                    <>
                                        <Input
                                            value={filterValue}
                                            onChange={setFilterValue}
                                            placeholder="Filter settings..."
                                            size="small"
                                            style={{ width: 150 }}
                                        />
                                        <Button size="small" variant="ghost" onClick={() => alert('Reset settings')}>
                                            Reset
                                        </Button>
                                    </>
                                )}

                                {/* About Tab Toolbar */}
                                {toolbarActiveTab === 'About' && (
                                    <Button size="small" variant="ghost" onClick={() => alert('Check for updates')}>
                                        Check Updates
                                    </Button>
                                )}
                            </>
                        }
                    />

                    {/* Content Area */}
                    <div style={{ padding: 20, background: 'var(--nc-bg-text)' }}>
                        {toolbarActiveTab === 'Home' && (
                            <div>
                                <h3>Home Content</h3>
                                <p>Welcome to the home tab. This toolbar pattern is useful for applications with tabbed navigation and action buttons.</p>
                            </div>
                        )}
                        {toolbarActiveTab === 'Settings' && (
                            <div>
                                <h3>Settings Content</h3>
                                <p>Configure your preferences here. The toolbar stays in place as you switch between tabs.</p>
                            </div>
                        )}
                        {toolbarActiveTab === 'About' && (
                            <div>
                                <h3>About Content</h3>
                                <p>This demo shows how to combine tabs with a toolbar for application layouts.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
