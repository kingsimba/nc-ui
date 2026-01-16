import { useState } from 'react'
import { Tabs, Button, Input, RefreshButton } from '../../../src'

export function TabsSection() {
    const [activeTab, setActiveTab] = useState('Tab 1')
    const [toolbarActiveTab, setToolbarActiveTab] = useState('Home')
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
                <h2>Basic Tabs</h2>
                <div className="dev-col">
                    <Tabs
                        tabs={['Tab 1', 'Tab 2', 'Tab 3']}
                        active={activeTab}
                        onChange={setActiveTab}
                    />
                    <div style={{ padding: 16, background: 'var(--nc-button-bg)', borderRadius: 8 }}>
                        Content for: {activeTab}
                    </div>
                </div>
            </section>

            <section className="dev-section">
                <h2>Toolbar with Tabs</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    Tabs combined with a toolbar for application controls
                </p>
                <div style={{
                    border: '1px solid var(--nc-border)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: 'var(--nc-bg)',
                }}>
                    {/* Toolbar with Tabs */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 16,
                        borderBottom: '1px solid var(--nc-border)',
                        background: 'var(--nc-bg-secondary)',
                    }}>
                        <Tabs
                            tabs={['Home', 'Settings', 'About']}
                            active={toolbarActiveTab}
                            onChange={setToolbarActiveTab}
                        />
                        <div style={{ display: 'flex', gap: 8, paddingRight: 16, alignItems: 'center' }}>
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
                        </div>
                    </div>

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
