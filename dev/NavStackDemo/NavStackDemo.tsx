import { useState } from 'react';
import { Button, ListGroup, ListGroupItem, Toggle } from '../../src';
import {
    NavStackProvider,
    NavStackContainer,
    useNavStack,
    useNavView,
} from '../../src/components/NavStack';
import {
    ChevronRightIcon,
    EditIcon,
    LockIcon,
    InfoIcon,
    WifiIcon,
} from '../../src/components/icons';

// ============================================================================
// Demo Views - Mobile Settings Style
// ============================================================================

function SettingsHomeView() {
    const { push } = useNavStack();
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ListGroup title="General">
                <ListGroupItem onClick={() => push({
                    id: 'wifi',
                    title: 'Wi-Fi',
                    component: <WifiSettingsView />
                })}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                        <WifiIcon size={20} />
                        <div style={{ flex: 1 }}>
                            <div>Wi-Fi</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--nc-text-weak)' }}>
                                Connected to Home Network
                            </div>
                        </div>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span>Dark Mode</span>
                        <Toggle checked={darkMode} onChange={setDarkMode} />
                    </div>
                </ListGroupItem>
            </ListGroup>

            <ListGroup title="Account">
                <ListGroupItem onClick={() => push({
                    id: 'profile',
                    title: 'Profile',
                    component: <ProfileView />
                })}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                        <EditIcon size={20} />
                        <div style={{ flex: 1 }}>Profile</div>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem onClick={() => push({
                    id: 'security',
                    title: 'Security',
                    component: <SecurityView />
                })}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                        <LockIcon size={20} />
                        <div style={{ flex: 1 }}>Security</div>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false} onClick={() => push({
                    id: 'about',
                    title: 'About',
                    component: <AboutView />
                })}>
                    <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                        <InfoIcon size={20} />
                        <div style={{ flex: 1 }}>About</div>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}

function WifiSettingsView() {
    const { push } = useNavStack();

    const networks = [
        { name: 'Home Network', connected: true, strength: 'Excellent' },
        { name: 'Office_5G', connected: false, strength: 'Good' },
        { name: 'Guest Network', connected: false, strength: 'Fair' },
        { name: 'Neighbor_WiFi', connected: false, strength: 'Weak' },
    ];

    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ListGroup title="Available Networks">
                {networks.map((network, index) => (
                    <ListGroupItem
                        key={network.name}
                        showBorder={index < networks.length - 1}
                        onClick={() => push({
                            id: `network-${network.name}`,
                            title: network.name,
                            component: <NetworkDetailView network={network} />
                        })}
                    >
                        <div style={{ display: 'flex', gap: 12, width: '100%', alignItems: 'center' }}>
                            <WifiIcon size={20} />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {network.name}
                                    {network.connected && (
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--nc-success)',
                                            fontWeight: 500
                                        }}>
                                            Connected
                                        </span>
                                    )}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--nc-text-weak)' }}>
                                    Signal: {network.strength}
                                </div>
                            </div>
                            <ChevronRightIcon size={16} />
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

function NetworkDetailView({ network }: { network: { name: string; connected: boolean; strength: string } }) {
    const { pop } = useNavStack();

    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ListGroup title="Network Info">
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Name</span>
                        <span style={{ color: 'var(--nc-text-weak)' }}>{network.name}</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Status</span>
                        <span style={{ color: network.connected ? 'var(--nc-success)' : 'var(--nc-text-weak)' }}>
                            {network.connected ? 'Connected' : 'Not Connected'}
                        </span>
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Signal Strength</span>
                        <span style={{ color: 'var(--nc-text-weak)' }}>{network.strength}</span>
                    </div>
                </ListGroupItem>
            </ListGroup>

            <ListGroup>
                <ListGroupItem showBorder={false} onClick={() => {
                    if (network.connected) {
                        alert('Disconnected from ' + network.name);
                    } else {
                        alert('Connecting to ' + network.name + '...');
                    }
                    pop();
                }}>
                    <div style={{ textAlign: 'center', color: network.connected ? 'var(--nc-danger)' : 'var(--nc-primary)' }}>
                        {network.connected ? 'Disconnect' : 'Connect'}
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}

function ProfileView() {
    const { setToolbar, clearToolbar } = useNavView();
    const [editing, setEditing] = useState(false);

    const toggleEdit = () => {
        if (editing) {
            clearToolbar();
        } else {
            setToolbar(
                <Button size="small" variant="primary" onClick={() => {
                    alert('Saved!');
                    setEditing(false);
                    clearToolbar();
                }}>
                    Save
                </Button>
            );
        }
        setEditing(!editing);
    };

    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ListGroup title="User Information">
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Name</span>
                        <span style={{ color: 'var(--nc-text-weak)' }}>John Doe</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Email</span>
                        <span style={{ color: 'var(--nc-text-weak)' }}>john@example.com</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Member Since</span>
                        <span style={{ color: 'var(--nc-text-weak)' }}>Jan 2024</span>
                    </div>
                </ListGroupItem>
            </ListGroup>

            <ListGroup>
                <ListGroupItem showBorder={false} onClick={toggleEdit}>
                    <div style={{ textAlign: 'center', color: 'var(--nc-primary)' }}>
                        {editing ? 'Cancel Edit' : 'Edit Profile'}
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}

function SecurityView() {
    const { push } = useNavStack();

    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ListGroup title="Authentication">
                <ListGroupItem onClick={() => push({
                    id: 'change-password',
                    title: 'Change Password',
                    component: <ChangePasswordView />
                })}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span>Change Password</span>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span>Two-Factor Authentication</span>
                        <Toggle checked={true} onChange={() => { }} />
                    </div>
                </ListGroupItem>
            </ListGroup>

            <ListGroup title="Sessions">
                <ListGroupItem showBorder={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Active Sessions</span>
                        <span style={{ color: 'var(--nc-text-weak)' }}>2 devices</span>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}

function ChangePasswordView() {
    const { pop, reset } = useNavStack();

    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ListGroup title="Password Requirements">
                <ListGroupItem>
                    <span style={{ color: 'var(--nc-text-weak)', fontSize: '0.875rem' }}>
                        • At least 8 characters
                    </span>
                </ListGroupItem>
                <ListGroupItem>
                    <span style={{ color: 'var(--nc-text-weak)', fontSize: '0.875rem' }}>
                        • Include uppercase and lowercase letters
                    </span>
                </ListGroupItem>
                <ListGroupItem showBorder={false}>
                    <span style={{ color: 'var(--nc-text-weak)', fontSize: '0.875rem' }}>
                        • Include at least one number
                    </span>
                </ListGroupItem>
            </ListGroup>

            <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="primary" block onClick={() => {
                    alert('Password changed!');
                    pop();
                }}>
                    Save Password
                </Button>
            </div>

            <Button variant="ghost" block onClick={reset}>
                Back to Settings Home
            </Button>
        </div>
    );
}

function AboutView() {
    return (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ListGroup title="App Information">
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Version</span>
                        <span style={{ color: 'var(--nc-text-weak)' }}>1.0.0</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Build</span>
                        <span style={{ color: 'var(--nc-text-weak)' }}>2026.01.15</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>License</span>
                        <span style={{ color: 'var(--nc-text-weak)' }}>MIT</span>
                    </div>
                </ListGroupItem>
            </ListGroup>

            <ListGroup title="Legal">
                <ListGroupItem onClick={() => alert('Opening Terms of Service...')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span>Terms of Service</span>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
                <ListGroupItem showBorder={false} onClick={() => alert('Opening Privacy Policy...')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span>Privacy Policy</span>
                        <ChevronRightIcon size={16} />
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}

// ============================================================================
// Main App Component
// ============================================================================

export function NavStackDemo() {
    return (
        <NavStackProvider rootView={{
            id: 'settings-home',
            title: 'Settings',
            component: <SettingsHomeView />
        }}>
            <NavStackContainer />
        </NavStackProvider>
    );
}
