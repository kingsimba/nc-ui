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
    RefreshButton,
    CloseButton,
    EditButton,
    TrashButton,
    Hyperlink,
    CloseIcon,
    HideAppsIcon,
    ViewIcon,
    WifiIcon,
    LockIcon,
    UnlockIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    RefreshIcon,
    RevertIcon,
    EditIcon,
    DeleteIcon,
    ClearAllIcon,
    EmptyFolderIcon,
    InfoIcon,
    PieChartIcon,
    PowerIcon,
    CameraIcon,
    PlusIcon,
    MinusIcon,
    DoubleClickMoveIcon,
    MoreIcon,
    Input,
    ListGroup,
    ListGroupItem,
    MultiSelect,
    NumberInput,
    Slider,
    Tabs,
    Toggle,
} from '../src'
import type { SupportedLocale } from '../src'

export default function App() {
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')
    const [lang, setLang] = useState<SupportedLocale>('en')
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

    return (
        <div className="dev-container">
            <header className="dev-header">
                <h1>nc-ui Component Playground</h1>
                <div className="dev-row">
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
            </header>

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

            <section className="dev-section">
                <h2>Hyperlink</h2>
                <div className="dev-row">
                    <Hyperlink onClick={() => alert('Link clicked')}>Click me</Hyperlink>
                    <Hyperlink onClick={() => { }} size="small">Small link</Hyperlink>
                    <Hyperlink onClick={() => { }} disabled>Disabled link</Hyperlink>
                </div>
            </section>

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
                                icon: <DeleteIcon size={16} />,
                                onClick: () => alert('Delete clicked'),
                                variant: 'danger',
                            },
                        ]}
                    />
                </div>
            </section>

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

            <section className="dev-section">
                <h2>Icons</h2>
                <div className="dev-row" style={{ flexWrap: 'wrap', gap: '24px' }}>
                    <div className="dev-item">
                        <CloseIcon size={24} />
                        <span>CloseIcon</span>
                    </div>
                    <div className="dev-item">
                        <HideAppsIcon size={24} />
                        <span>HideAppsIcon</span>
                    </div>
                    <div className="dev-item">
                        <ViewIcon size={24} />
                        <span>ViewIcon</span>
                    </div>
                    <div className="dev-item">
                        <WifiIcon size={24} />
                        <span>WifiIcon</span>
                    </div>
                    <div className="dev-item">
                        <LockIcon size={24} />
                        <span>LockIcon</span>
                    </div>
                    <div className="dev-item">
                        <UnlockIcon size={24} />
                        <span>UnlockIcon</span>
                    </div>
                    <div className="dev-item">
                        <ChevronRightIcon size={24} />
                        <span>ChevronRightIcon</span>
                    </div>
                    <div className="dev-item">
                        <ChevronDownIcon size={24} />
                        <span>ChevronDownIcon</span>
                    </div>
                    <div className="dev-item">
                        <RefreshIcon size={24} />
                        <span>RefreshIcon</span>
                    </div>
                    <div className="dev-item">
                        <RevertIcon size={24} />
                        <span>RevertIcon</span>
                    </div>
                    <div className="dev-item">
                        <EditIcon size={24} />
                        <span>EditIcon</span>
                    </div>
                    <div className="dev-item">
                        <DeleteIcon size={24} />
                        <span>DeleteIcon</span>
                    </div>
                    <div className="dev-item">
                        <ClearAllIcon size={24} />
                        <span>ClearAllIcon</span>
                    </div>
                    <div className="dev-item">
                        <EmptyFolderIcon size={24} />
                        <span>EmptyFolderIcon</span>
                    </div>
                    <div className="dev-item">
                        <InfoIcon size={24} />
                        <span>InfoIcon</span>
                    </div>
                    <div className="dev-item">
                        <PieChartIcon size={24} />
                        <span>PieChartIcon</span>
                    </div>
                    <div className="dev-item">
                        <PowerIcon size={24} />
                        <span>PowerIcon</span>
                    </div>
                    <div className="dev-item">
                        <CameraIcon size={24} />
                        <span>CameraIcon</span>
                    </div>
                    <div className="dev-item">
                        <PlusIcon size={24} />
                        <span>PlusIcon</span>
                    </div>
                    <div className="dev-item">
                        <MinusIcon size={24} />
                        <span>MinusIcon</span>
                    </div>
                    <div className="dev-item">
                        <DoubleClickMoveIcon size={24} />
                        <span>DoubleClickMoveIcon</span>
                    </div>
                    <div className="dev-item">
                        <MoreIcon size={24} />
                        <span>MoreIcon</span>
                    </div>
                </div>
            </section>

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

            <section className="dev-section">
                <h2>ListGroup</h2>
                <ListGroup title="Settings">
                    <ListGroupItem onClick={() => alert('Account clicked')}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <span>Account</span>
                            <ChevronRightIcon size={16} />
                        </div>
                    </ListGroupItem>
                    <ListGroupItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <span>Dark Mode</span>
                            <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
                        </div>
                    </ListGroupItem>
                    <ListGroupItem showBorder={false}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <span>Version</span>
                            <span style={{ color: 'var(--nc-text-weak)' }}>1.0.0</span>
                        </div>
                    </ListGroupItem>
                </ListGroup>
            </section>
        </div>
    )
}
