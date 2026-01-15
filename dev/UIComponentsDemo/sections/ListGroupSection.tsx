import { ListGroup, ListGroupItem, Toggle } from '../../../src'
import {
    ChevronRightIcon,
    EditIcon,
    LockIcon,
    InfoIcon,
    PowerIcon,
} from '../../../src/components/icons'

interface ListGroupSectionProps {
    theme: 'dark' | 'light'
    toggleTheme: () => void
}

export function ListGroupSection({ theme, toggleTheme }: ListGroupSectionProps) {
    return (
        <>
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

            <ListGroup title="Account">
                <ListGroupItem onClick={() => alert('Profile')}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                        <EditIcon size={20} />
                        <div style={{ flex: 1 }}>
                            <div>Profile</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--nc-text-weak)' }}>
                                View and edit your profile
                            </div>
                        </div>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem onClick={() => alert('Settings')}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                        <EditIcon size={20} />
                        <div style={{ flex: 1 }}>Settings</div>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem onClick={() => alert('Notifications')}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                        <InfoIcon size={20} />
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Notifications</span>
                            <span style={{
                                background: 'var(--nc-danger)',
                                color: 'white',
                                borderRadius: 12,
                                padding: '2px 8px',
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }}>
                                3
                            </span>
                        </div>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem onClick={() => alert('Security')}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                        <LockIcon size={20} />
                        <div style={{ flex: 1 }}>Security</div>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false} onClick={() => alert('Help')}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                        <InfoIcon size={20} />
                        <div style={{ flex: 1 }}>Help & Support</div>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
            </ListGroup>

            <ListGroup title="Simple List">
                <ListGroupItem onClick={() => alert('Item 1')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>First Item</span>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem onClick={() => alert('Item 2')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Second Item</span>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false} onClick={() => alert('Item 3')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Third Item</span>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
            </ListGroup>

            <ListGroup title="Danger Zone">
                <ListGroupItem onClick={() => alert('Clear cache')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span>Clear Cache</span>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false} onClick={() => confirm('Are you sure you want to log out?')}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center', color: 'var(--nc-danger)' }}>
                        <PowerIcon size={20} />
                        <span>Log Out</span>
                    </div>
                </ListGroupItem>
            </ListGroup>

            <ListGroup title="Device Info">
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span style={{ color: 'var(--nc-text-weak)' }}>Device Name</span>
                        <span>iPhone 15 Pro</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span style={{ color: 'var(--nc-text-weak)' }}>OS Version</span>
                        <span>17.2.1</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span style={{ color: 'var(--nc-text-weak)' }}>Storage</span>
                        <span>128 GB</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span style={{ color: 'var(--nc-text-weak)' }}>Battery Health</span>
                        <span>98%</span>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}
