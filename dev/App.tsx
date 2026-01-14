import { useState } from 'react'
import {
    Alert,
    Battery,
    Button,
    ButtonGroup,
    ActivityIndicator,
    Checkbox,
    ComboBox,
    ContextMenu,
    Dialog,
    RefreshButton,
    CloseButton,
    EditButton,
    TrashButton,
    Hyperlink,
    Input,
    MultiSelect,
    NumberInput,
    Slider,
    Tabs,
    Toggle,
    AppPanel,
    ViewportProvider,
    runningAppsStore,
} from '../src'
import {
    ViewIcon,
    EditIcon,
    TrashIcon,
} from '../src/components/icons'
import type { SupportedLocale } from '../src'
import { IconsSection } from './IconsSection'
import { ListGroupSection } from './ListGroupSection'

export default function App() {
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [theme, setTheme] = useState<'dark' | 'light'>('light')
    const [lang, setLang] = useState<SupportedLocale>('en')
    const [activeSection, setActiveSection] = useState('app-framework')
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)
    const [checked3, setChecked3] = useState(false)
    const [comboValue, setComboValue] = useState<string | undefined>('opt1')
    const [comboValue2, setComboValue2] = useState<string | undefined>()
    const [comboValue3, setComboValue3] = useState<string | undefined>('opt1')
    const [comboValue4, setComboValue4] = useState<string | undefined>('opt1')
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left')
    const [contextMenuOpen, setContextMenuOpen] = useState(false)
    const [contextMenuAnchor, setContextMenuAnchor] = useState<HTMLButtonElement | null>(null)

    // New component states
    const [inputValue, setInputValue] = useState('')
    const [numberValue, setNumberValue] = useState(50)
    const [sliderValue, setSliderValue] = useState(30)
    const [toggleChecked, setToggleChecked] = useState(false)
    const [multiSelectValues, setMultiSelectValues] = useState<string[]>(['opt1'])
    const [activeTab, setActiveTab] = useState('Tab 1')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialog2Open, setDialog2Open] = useState(false)
    const [dialog3Open, setDialog3Open] = useState(false)

    const comboOptions = [
        { label: 'Option 1', value: 'opt1', default: true },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' },
        { label: 'Long Option Name Here', value: 'opt4' },
    ]

    const langOptions = [
        { label: 'English', value: 'en' },
        { label: '中文', value: 'zh' },
        { label: 'Deutsch', value: 'de' },
        { label: 'ไทย', value: 'th' },
        { label: 'Español', value: 'es' },
    ]

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.classList.toggle('light', newTheme === 'light')
    }

    const changeLanguage = (newLang: string | undefined) => {
        if (newLang) {
            setLang(newLang as SupportedLocale)
            document.documentElement.lang = newLang
        }
    }

    const simulateLoading = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
    }

    const simulateRefresh = () => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1500)
    }

    const sections = [
        { id: 'app-framework', label: 'App Framework' },
        { id: 'buttons', label: 'Button' },
        { id: 'activity', label: 'ActivityIndicator' },
        { id: 'checkbox', label: 'Checkbox' },
        { id: 'combobox', label: 'ComboBox' },
        { id: 'buttons-icon', label: 'Icon Buttons' },
        { id: 'hyperlink', label: 'Hyperlink' },
        { id: 'alert', label: 'Alert' },
        { id: 'battery', label: 'Battery' },
        { id: 'context-menu', label: 'ContextMenu' },
        { id: 'button-group', label: 'ButtonGroup' },
        { id: 'input', label: 'Input' },
        { id: 'number-input', label: 'NumberInput' },
        { id: 'slider', label: 'Slider' },
        { id: 'toggle', label: 'Toggle' },
        { id: 'multi-select', label: 'MultiSelect' },
        { id: 'icons', label: 'Icons' },
        { id: 'tabs', label: 'Tabs' },
        { id: 'list-group', label: 'ListGroup' },
        { id: 'dialog', label: 'Dialog' },
    ]

    return (
        <div className="dev-app">
            <header className="dev-sticky-header">
                <div className="dev-header-content">
                    <h1>nc-ui Component Playground</h1>
                    <div className="dev-header-controls">
                        <ComboBox
                            options={langOptions}
                            value={lang}
                            onChange={changeLanguage}
                            size="small"
                            clearable={false}
                            style={{ width: 120 }}
                        />
                        <Button variant="ghost" size="small" onClick={toggleTheme}>
                            Theme: {theme}
                        </Button>
                    </div>
                </div>
            </header>

            <div className="dev-main">
                <aside className="dev-sidebar">
                    <nav className="dev-nav">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={`dev-nav-item ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <div className="dev-container">
                    {activeSection === 'app-framework' && (
                        <section className="dev-section">
                            <h2>App Framework Demo</h2>
                            <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                                A Windows 11-style app launcher with AppPanel (taskbar) and StartApp.
                                Click the buttons below to launch apps, or click in the panel on the right.
                            </p>
                            <div className="dev-row" style={{ marginBottom: 16 }}>
                                <Button onClick={() => runningAppsStore.launchApp('start')}>
                                    Open Start Menu
                                </Button>
                            </div>
                            <div style={{
                                display: 'flex',
                                border: '1px solid var(--nc-border)',
                                borderRadius: 8,
                                height: 500,
                                overflow: 'hidden',
                                background: 'var(--nc-bg)'
                            }}>
                                {/* Main content area placeholder */}
                                <div style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--nc-text-weak)',
                                    padding: 20,
                                    textAlign: 'center',
                                    background: 'var(--nc-bg-secondary)',
                                }}>
                                    <div>
                                        <p style={{ fontSize: 18, marginBottom: 8 }}>Main Content Area</p>
                                        <p style={{ fontSize: 14 }}>Apps open in the panel on the right →</p>
                                    </div>
                                </div>
                                {/* AppPanel - Windows 11 style taskbar */}
                                <ViewportProvider>
                                    <AppPanel />
                                </ViewportProvider>
                            </div>
                        </section>
                    )}

                    {activeSection === 'buttons' && (
                        <>
                            <section className="dev-section">
                                <h2>Button Variants</h2>
                                <div className="dev-row">
                                    <Button>Default</Button>
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="danger">Danger</Button>
                                    <Button variant="warning">Warning</Button>
                                    <Button variant="success">Success</Button>
                                    <Button variant="ghost">Ghost</Button>
                                </div>
                            </section>

                            <section className="dev-section">
                                <h2>Button Sizes</h2>
                                <div className="dev-row">
                                    <Button size="small">Small</Button>
                                    <Button size="default">Default</Button>
                                    <Button size="large">Large</Button>
                                </div>
                            </section>

                            <section className="dev-section">
                                <h2>Button States</h2>
                                <div className="dev-row">
                                    <Button disabled>Disabled</Button>
                                    <Button variant="primary" disabled>Disabled Primary</Button>
                                    <Button variant="primary" loading={loading} onClick={simulateLoading}>
                                        {loading ? 'Loading...' : 'Click to Load'}
                                    </Button>
                                    <Button block>Block Button (Full Width)</Button>
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'activity' && (
                        <>
                            <section className="dev-section">
                                <h2>ActivityIndicator</h2>
                                <div className="dev-row">
                                    <div className="dev-item">
                                        <ActivityIndicator size="small" />
                                        <span>Small</span>
                                    </div>
                                    <div className="dev-item">
                                        <ActivityIndicator size="default" />
                                        <span>Default</span>
                                    </div>
                                    <div className="dev-item">
                                        <ActivityIndicator size="large" />
                                        <span>Large</span>
                                    </div>
                                    <div className="dev-item">
                                        <ActivityIndicator color="#22c55e" />
                                        <span>Custom Color</span>
                                    </div>
                                </div>
                            </section>

                            <section className="dev-section">
                                <h2>ActivityIndicator Overlay</h2>
                                <div className="dev-overlay-demo">
                                    <p>This box has an overlay spinner</p>
                                    <ActivityIndicator overlay />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'checkbox' && (
                        <>
                            <section className="dev-section">
                                <h2>Checkbox</h2>
                                <div className="dev-col">
                                    <Checkbox
                                        checked={checked1}
                                        onChange={setChecked1}
                                        label="Default checkbox"
                                    />
                                    <Checkbox
                                        checked={checked2}
                                        onChange={setChecked2}
                                        label="Checked checkbox"
                                    />
                                    <Checkbox
                                        checked={checked3}
                                        onChange={setChecked3}
                                        label="Small checkbox"
                                        size="small"
                                    />
                                    <Checkbox
                                        checked={true}
                                        onChange={() => { }}
                                        label="Disabled checkbox"
                                        disabled
                                    />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'combobox' && (
                        <>
                            <section className="dev-section">
                                <h2>ComboBox</h2>
                                <div className="dev-col" style={{ maxWidth: 300 }}>
                                    <ComboBox
                                        label="Default ComboBox"
                                        options={comboOptions}
                                        value={comboValue}
                                        onChange={setComboValue}
                                        placeholder="Select an option..."
                                    />
                                    <ComboBox
                                        label="Small ComboBox"
                                        options={comboOptions}
                                        value={comboValue2}
                                        onChange={setComboValue2}
                                        size="small"
                                        placeholder="Select..."
                                    />
                                    <ComboBox
                                        label="With Typing"
                                        options={comboOptions}
                                        value={comboValue3}
                                        onChange={setComboValue3}
                                        allowTyping
                                        placeholder="Type to search..."
                                    />
                                    <ComboBox
                                        label="Non-clearable"
                                        options={comboOptions}
                                        value={comboValue4}
                                        onChange={setComboValue4}
                                        clearable={false}
                                    />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'buttons-icon' && (
                        <>
                            <section className="dev-section">
                                <h2>Icon Buttons</h2>
                                <div className="dev-row">
                                    <div className="dev-item">
                                        <RefreshButton onClick={simulateRefresh} loading={refreshing} />
                                        <span>Refresh</span>
                                    </div>
                                    <div className="dev-item">
                                        <CloseButton onClick={() => alert('Close clicked')} />
                                        <span>Close</span>
                                    </div>
                                    <div className="dev-item">
                                        <EditButton onClick={() => alert('Edit clicked')} />
                                        <span>Edit</span>
                                    </div>
                                    <div className="dev-item">
                                        <TrashButton onClick={() => alert('Delete clicked')} />
                                        <span>Trash</span>
                                    </div>
                                </div>
                                <h3>Sizes</h3>
                                <div className="dev-row">
                                    <RefreshButton onClick={() => { }} size="small" />
                                    <RefreshButton onClick={() => { }} size="default" />
                                    <RefreshButton onClick={() => { }} size="large" />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'hyperlink' && (
                        <>
                            <section className="dev-section">
                                <h2>Hyperlink</h2>
                                <div className="dev-row">
                                    <Hyperlink onClick={() => alert('Link clicked')}>Click me</Hyperlink>
                                    <Hyperlink onClick={() => { }} size="small">Small link</Hyperlink>
                                    <Hyperlink onClick={() => { }} disabled>Disabled link</Hyperlink>
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'alert' && (
                        <>
                            <section className="dev-section">
                                <h2>Alert</h2>
                                <Alert
                                    code={404}
                                    text="The requested resource could not be found on this server."
                                    type="error"
                                    button={{ text: 'Retry' }}
                                    onAction={() => alert('Retry clicked')}
                                />
                                <Alert
                                    code={429}
                                    text="Rate limit exceeded. Please wait before making more requests."
                                    type="warning"
                                    button={{ text: 'Dismiss' }}
                                    onAction={() => alert('Dismiss clicked')}
                                />
                                <Alert
                                    code={500}
                                    text="Internal server error occurred."
                                    type="error"
                                />
                            </section>
                        </>
                    )}

                    {activeSection === 'battery' && (
                        <>
                            <section className="dev-section">
                                <h2>Battery</h2>
                                <div className="dev-row">
                                    <div className="dev-item">
                                        <Battery percentage={0.05} colored />
                                        <span>5% (danger)</span>
                                    </div>
                                    <div className="dev-item">
                                        <Battery percentage={0.15} colored />
                                        <span>15% (warning)</span>
                                    </div>
                                    <div className="dev-item">
                                        <Battery percentage={0.75} colored />
                                        <span>75% (success)</span>
                                    </div>
                                    <div className="dev-item">
                                        <Battery percentage={1} colored />
                                        <span>100% (full)</span>
                                    </div>
                                    <div className="dev-item">
                                        <Battery percentage={0.6} status="charging" colored />
                                        <span>Charging</span>
                                    </div>
                                </div>
                                <h3>Monochrome</h3>
                                <div className="dev-row">
                                    <Battery percentage={0.5} darkMode={theme === 'dark'} />
                                    <Battery percentage={0.25} darkMode={theme === 'dark'} />
                                    <Battery percentage={0} darkMode={theme === 'dark'} />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'context-menu' && (
                        <>
                            <section className="dev-section">
                                <h2>ContextMenu</h2>
                                <div className="dev-row">
                                    <button
                                        className="nc-button"
                                        ref={setContextMenuAnchor}
                                        onClick={() => setContextMenuOpen(!contextMenuOpen)}
                                    >
                                        Open Menu
                                    </button>
                                    <ContextMenu
                                        open={contextMenuOpen}
                                        onClose={() => setContextMenuOpen(false)}
                                        anchor={contextMenuAnchor}
                                        options={[
                                            {
                                                id: 'view',
                                                label: 'View Details',
                                                icon: <ViewIcon size={16} />,
                                                onClick: () => alert('View clicked'),
                                            },
                                            {
                                                id: 'edit',
                                                label: 'Edit Item',
                                                icon: <EditIcon size={16} />,
                                                onClick: () => alert('Edit clicked'),
                                            },
                                            {
                                                id: 'disabled',
                                                label: 'Disabled Option',
                                                onClick: () => { },
                                                disabled: true,
                                            },
                                            {
                                                id: 'delete',
                                                label: 'Delete',
                                                icon: <TrashIcon size={16} />,
                                                onClick: () => alert('Delete clicked'),
                                                variant: 'danger',
                                            },
                                        ]}
                                    />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'button-group' && (
                        <>
                            <section className="dev-section">
                                <h2>ButtonGroup</h2>
                                <div className="dev-col">
                                    <ButtonGroup
                                        value={alignment}
                                        onChange={setAlignment}
                                        options={['left', 'center', 'right'] as const}
                                    />
                                    <ButtonGroup
                                        value={alignment}
                                        onChange={setAlignment}
                                        options={['left', 'center', 'right'] as const}
                                        size="small"
                                        labels={{ left: 'Left', center: 'Center', right: 'Right' }}
                                    />
                                    <ButtonGroup
                                        value="option1"
                                        onChange={() => { }}
                                        options={['option1', 'option2'] as const}
                                        disabled
                                    />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'input' && (
                        <>
                            <section className="dev-section">
                                <h2>Input</h2>
                                <div className="dev-col">
                                    <Input
                                        value={inputValue}
                                        onChange={setInputValue}
                                        placeholder="Type something..."
                                        label="Default Input"
                                    />
                                    <Input
                                        value={inputValue}
                                        onChange={setInputValue}
                                        placeholder="Small input"
                                        size="small"
                                        label="Small Input"
                                    />
                                    <Input
                                        value="Disabled"
                                        disabled
                                        label="Disabled Input"
                                    />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'number-input' && (
                        <>
                            <section className="dev-section">
                                <h2>NumberInput</h2>
                                <div className="dev-col">
                                    <NumberInput
                                        value={numberValue}
                                        onChange={setNumberValue}
                                        min={0}
                                        max={100}
                                        label="Default (0-100)"
                                    />
                                    <NumberInput
                                        value={numberValue}
                                        onChange={setNumberValue}
                                        min={0}
                                        max={100}
                                        step={5}
                                        size="small"
                                        label="Small with step=5"
                                    />
                                </div>
                            </section>
                        </>
                    )}
                    {activeSection === 'slider' && (
                        <>
                            <section className="dev-section">
                                <h2>Slider</h2>
                                <div className="dev-col">
                                    <Slider
                                        value={sliderValue}
                                        onChange={setSliderValue}
                                        label="Volume"
                                    />
                                    <Slider
                                        value={sliderValue}
                                        onChange={setSliderValue}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        formatValue={(v) => `${Math.round(v * 100)}%`}
                                        label="Percentage"
                                    />
                                    <Slider
                                        value={50}
                                        onChange={() => { }}
                                        disabled
                                        label="Disabled"
                                    />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'toggle' && (
                        <>
                            <section className="dev-section">
                                <h2>Toggle</h2>
                                <div className="dev-row">
                                    <Toggle
                                        checked={toggleChecked}
                                        onChange={setToggleChecked}
                                        label="Enable feature"
                                    />
                                    <Toggle
                                        checked={true}
                                        onChange={() => { }}
                                        disabled
                                        label="Disabled on"
                                    />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'multi-select' && (
                        <>
                            <section className="dev-section">
                                <h2>MultiSelect</h2>
                                <div className="dev-col">
                                    <MultiSelect
                                        values={multiSelectValues}
                                        onChange={setMultiSelectValues}
                                        options={comboOptions}
                                        label="Select multiple options"
                                    />
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'icons' && <IconsSection />}

                    {activeSection === 'tabs' && (
                        <>
                            <section className="dev-section">
                                <h2>Tabs</h2>
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
                        </>
                    )}

                    {activeSection === 'list-group' && (
                        <ListGroupSection theme={theme} toggleTheme={toggleTheme} />
                    )}

                    {activeSection === 'dialog' && (
                        <>
                            <section className="dev-section">
                                <h2>Dialog Variants</h2>
                                <div className="dev-row">
                                    <Button onClick={() => setDialogOpen(true)}>
                                        Open Dialog (OK/Cancel)
                                    </Button>
                                    <Button onClick={() => setDialog2Open(true)}>
                                        Save/Cancel Dialog
                                    </Button>
                                    <Button variant="danger" onClick={() => setDialog3Open(true)}>
                                        Delete Dialog
                                    </Button>
                                </div>
                            </section>

                            <Dialog
                                open={dialogOpen}
                                onClose={() => setDialogOpen(false)}
                                title="Confirm Action"
                                footerType="ok-cancel"
                                onOk={() => {
                                    alert('OK clicked')
                                    setDialogOpen(false)
                                }}
                            >
                                <p>Are you sure you want to proceed with this action?</p>
                            </Dialog>

                            <Dialog
                                open={dialog2Open}
                                onClose={() => setDialog2Open(false)}
                                title="Edit Profile"
                                footerType="save-cancel"
                                width={500}
                                onSave={() => {
                                    alert('Saved!')
                                    setDialog2Open(false)
                                }}
                            >
                                <div className="nc-col" style={{ gap: 12 }}>
                                    <div>
                                        <label className="nc-label">Name</label>
                                        <Input placeholder="Enter your name" />
                                    </div>
                                    <div>
                                        <label className="nc-label">Email</label>
                                        <Input placeholder="Enter your email" type="email" />
                                    </div>
                                </div>
                            </Dialog>

                            <Dialog
                                open={dialog3Open}
                                onClose={() => setDialog3Open(false)}
                                title="Delete Item"
                                footerType="delete-cancel"
                                onDelete={() => {
                                    alert('Deleted!')
                                    setDialog3Open(false)
                                }}
                            >
                                <p>This action cannot be undone. Are you sure you want to delete this item?</p>
                            </Dialog>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
