import { useState } from 'react'
import { Input } from '../../../src'
import {
    CloseIcon,
    HideAppsIcon,
    ViewIcon,
    EyeHiddenIcon,
    WifiIcon,
    LockIcon,
    UnlockIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    RefreshIcon,
    RevertIcon,
    EditIcon,
    TrashIcon,
    EmptyFolderIcon,
    InfoIcon,
    QuestionIcon,
    PieChartIcon,
    PowerIcon,
    CameraIcon,
    PlusIcon,
    MinusIcon,
    DoubleClickIcon,
    MoreIcon,
    MoreHorizontalIcon,
    MenuIcon,
    ExternalLinkIcon,
    SearchIcon,
    CopyIcon,
    DownloadIcon,
    FilterIcon,
    SunIcon,
    MoonIcon,
    SaveIcon,
    SettingsIcon,
    ConsoleIcon,
    StarIcon,
    PlayIcon,
    PauseIcon,
    StopIcon,
    PlayFilledIcon,
    PauseFilledIcon,
    StopFilledIcon,
} from '../../../src/components/icons'

// Grouped by role, alphabetical within each group.
const iconGroups = [
    {
        label: 'Navigation',
        icons: [
            { name: 'ChevronDownIcon', Icon: ChevronDownIcon },
            { name: 'ChevronRightIcon', Icon: ChevronRightIcon },
            { name: 'ExternalLinkIcon', Icon: ExternalLinkIcon },
            { name: 'MenuIcon', Icon: MenuIcon },
        ],
    },
    {
        label: 'View & search',
        icons: [
            { name: 'EyeHiddenIcon', Icon: EyeHiddenIcon },
            { name: 'FilterIcon', Icon: FilterIcon },
            { name: 'SearchIcon', Icon: SearchIcon },
            { name: 'ViewIcon', Icon: ViewIcon },
        ],
    },
    {
        label: 'Edit & files',
        icons: [
            { name: 'CopyIcon', Icon: CopyIcon },
            { name: 'DownloadIcon', Icon: DownloadIcon },
            { name: 'EditIcon', Icon: EditIcon },
            { name: 'EmptyFolderIcon', Icon: EmptyFolderIcon },
            { name: 'SaveIcon', Icon: SaveIcon },
            { name: 'TrashIcon', Icon: TrashIcon },
        ],
    },
    {
        label: 'Actions',
        icons: [
            { name: 'CloseIcon', Icon: CloseIcon },
            { name: 'DoubleClickIcon', Icon: DoubleClickIcon },
            { name: 'MinusIcon', Icon: MinusIcon },
            { name: 'MoreHorizontalIcon', Icon: MoreHorizontalIcon },
            { name: 'MoreIcon', Icon: MoreIcon },
            { name: 'PlusIcon', Icon: PlusIcon },
            { name: 'RefreshIcon', Icon: RefreshIcon },
            { name: 'RevertIcon', Icon: RevertIcon },
        ],
    },
    {
        label: 'Media',
        icons: [
            { name: 'PauseIcon', Icon: PauseIcon },
            { name: 'PauseFilledIcon', Icon: PauseFilledIcon },
            { name: 'PlayIcon', Icon: PlayIcon },
            { name: 'PlayFilledIcon', Icon: PlayFilledIcon },
            { name: 'StopIcon', Icon: StopIcon },
            { name: 'StopFilledIcon', Icon: StopFilledIcon },
        ],
    },
    {
        label: 'Status & theme',
        icons: [
            { name: 'InfoIcon', Icon: InfoIcon },
            { name: 'LockIcon', Icon: LockIcon },
            { name: 'MoonIcon', Icon: MoonIcon },
            { name: 'PowerIcon', Icon: PowerIcon },
            { name: 'QuestionIcon', Icon: QuestionIcon },
            { name: 'StarIcon', Icon: StarIcon },
            { name: 'SunIcon', Icon: SunIcon },
            { name: 'UnlockIcon', Icon: UnlockIcon },
            { name: 'WifiIcon', Icon: WifiIcon },
        ],
    },
    {
        label: 'Devices & apps',
        icons: [
            { name: 'CameraIcon', Icon: CameraIcon },
            { name: 'ConsoleIcon', Icon: ConsoleIcon },
            { name: 'HideAppsIcon', Icon: HideAppsIcon },
            { name: 'PieChartIcon', Icon: PieChartIcon },
            { name: 'SettingsIcon', Icon: SettingsIcon },
        ],
    },
]

export function IconsSection() {
    const [filter, setFilter] = useState('')

    const query = filter.trim().toLowerCase()
    const visibleGroups = iconGroups
        .map(({ label, icons }) => ({
            label,
            icons: query ? icons.filter(({ name }) => name.toLowerCase().includes(query)) : icons,
        }))
        .filter(({ icons }) => icons.length > 0)
    const totalMatches = visibleGroups.reduce((sum, { icons }) => sum + icons.length, 0)

    return (
        <section className="dev-section">
            <h2>Icons</h2>
            <Input
                value={filter}
                onChange={setFilter}
                placeholder="Filter icons..."
                leadingIcon={<SearchIcon size={16} />}
                style={{ maxWidth: 280, marginBottom: 16 }}
            />
            {totalMatches === 0 ? (
                <p style={{ color: 'var(--nc-text-weak)', fontSize: 14 }}>No icons match “{filter}”.</p>
            ) : (
                visibleGroups.map(({ label, icons }) => (
                    <div key={label} style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 13, fontWeight: 500, color: 'var(--nc-text-weak)', margin: '0 0 12px' }}>
                            {label}
                        </h3>
                        <div className="dev-row" style={{ flexWrap: 'wrap', gap: '24px' }}>
                            {icons.map(({ name, Icon }) => (
                                <div className="dev-item" key={name}>
                                    <Icon size={24} />
                                    <span>{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </section>
    )
}
