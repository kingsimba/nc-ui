import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuBar, type MenuBarMenu } from '../../../src/components/MenuBar';
import { Checkbox } from '../../../src/components/Checkbox';
import { EditIcon } from '../../../src/components/icons';

export function MenuBarSection() {
    const { t } = useTranslation();
    const [icons, setIcons] = useState(true);
    const [statusBar, setStatusBar] = useState(true);
    const [lastCommand, setLastCommand] = useState('');
    const command = (label: string) => () => setLastCommand(label);
    const menus: MenuBarMenu[] = [
        {
            id: 'file', label: t('menuBar.file'), items: [
                { id: 'new', label: t('menuBar.newFile'), icon: icons ? <EditIcon /> : undefined, shortcut: 'Ctrl+N', onSelect: command(t('menuBar.newFile')) },
                {
                    id: 'open', label: t('menuBar.openRecent'), items: [
                        { id: 'app', label: 'App.tsx', onSelect: command('App.tsx') },
                        { id: 'theme', label: 'theme.css', onSelect: command('theme.css') },
                        { id: 'more', label: t('menuBar.more'), items: [{ id: 'readme', label: 'README.md', onSelect: command('README.md') }] },
                    ]
                },
                { id: 'separator', type: 'separator' },
                { id: 'save', label: t('common.save'), shortcut: 'Ctrl+S', onSelect: command(t('common.save')) },
                { id: 'save-all', label: t('menuBar.saveAll'), disabled: true },
            ]
        },
        {
            id: 'edit', label: t('menuBar.edit'), items: [
                { id: 'undo', label: t('menuBar.undo'), shortcut: 'Ctrl+Z', onSelect: command(t('menuBar.undo')) },
                { id: 'redo', label: t('menuBar.redo'), shortcut: 'Ctrl+Shift+Z', onSelect: command(t('menuBar.redo')) },
            ]
        },
        {
            id: 'view', label: t('menuBar.view'), items: [
                { id: 'appearance', type: 'label', label: t('menuBar.appearance') },
                { id: 'status', type: 'checkbox', label: t('menuBar.statusBar'), checked: statusBar, onCheckedChange: setStatusBar },
            ]
        },
    ];

    return <section className="dev-section">
        <h2>MenuBar</h2>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <Checkbox checked={icons} onChange={setIcons} label={t('menuBar.icons')} />
        </div>
        <MenuBar menus={menus} aria-label={t('menuBar.applicationMenu')} />
        <pre className="code-block" style={{ minHeight: 120 }}>nc-ui-workspace/{'\n'}  src/{'\n'}    App.tsx{'\n'}    theme.css</pre>
        {statusBar && <output aria-live="polite">{lastCommand || t('menuBar.ready')}</output>}
    </section>;
}