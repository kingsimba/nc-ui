import { useState } from 'react';
import { ContextMenu } from '../../../src';
import { ViewIcon, EditIcon, TrashIcon } from '../../../src/components/icons';

export function ContextMenuSection() {
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const [showDetails, setShowDetails] = useState(true);
  const [contextMenuAnchor, setContextMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const [plainMenuOpen, setPlainMenuOpen] = useState(false);
  const [plainMenuAnchor, setPlainMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const [compactMenuOpen, setCompactMenuOpen] = useState(false);
  const [compactMenuAnchor, setCompactMenuAnchor] = useState<HTMLButtonElement | null>(null);

  return (
    <section className="dev-section">
      <h2>ContextMenu</h2>
      <div className="dev-row" onContextMenu={event => {
        event.preventDefault();
        setPosition({ x: event.clientX, y: event.clientY });
        setContextMenuOpen(true);
      }}>
        <button
          className="nc-button"
          ref={setContextMenuAnchor}
          onClick={() => { setPosition(undefined); setContextMenuOpen(!contextMenuOpen); }}
        >
          Open Menu
        </button>
        <ContextMenu
          open={contextMenuOpen}
          onClose={() => setContextMenuOpen(false)}
          anchor={contextMenuAnchor}
          position={position}
          aria-label="Item actions"
          options={[
            {
              id: 'display', label: 'Display', icon: <ViewIcon size={16} />,
              items: [
                { id: 'details', label: 'Show details', type: 'checkbox', checked: showDetails, onCheckedChange: setShowDetails },
                {
                  id: 'layout', label: 'Layout', items: [
                    { id: 'compact', label: 'Compact', onClick: () => alert('Compact layout') },
                    { id: 'comfortable', label: 'Comfortable', onClick: () => alert('Comfortable layout') },
                  ]
                },
              ],
            },
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
              variant: 'primary',
            },
            {
              id: 'warning',
              label: 'Warning Action',
              onClick: () => alert('Warning clicked'),
              variant: 'warning',
            },
            {
              id: 'success',
              label: 'Success Action',
              onClick: () => alert('Success clicked'),
              variant: 'success',
            },
            {
              id: 'sep1',
              type: 'separator',
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
        <button
          className="nc-button"
          ref={setPlainMenuAnchor}
          onClick={() => setPlainMenuOpen(!plainMenuOpen)}
        >
          Open Menu Without Icons
        </button>
        <ContextMenu
          open={plainMenuOpen}
          onClose={() => setPlainMenuOpen(false)}
          anchor={plainMenuAnchor}
          aria-label="Editor actions without icons"
          options={[
            { id: 'plain-header', type: 'label', label: 'Editor' },
            { id: 'plain-undo', label: 'Undo', shortcut: 'Ctrl+Z', onClick: () => alert('Undo') },
            { id: 'plain-redo', label: 'Redo', shortcut: 'Ctrl+Shift+Z', onClick: () => alert('Redo') },
            { id: 'plain-sep', type: 'separator' },
            { id: 'plain-select-all', label: 'Select all', shortcut: 'Ctrl+A', onClick: () => alert('Select all') },
            {
              id: 'plain-view', label: 'Appearance', items: [
                { id: 'plain-zoom-in', label: 'Zoom in', shortcut: 'Ctrl+=', onClick: () => alert('Zoom in') },
                { id: 'plain-zoom-out', label: 'Zoom out', shortcut: 'Ctrl+-', onClick: () => alert('Zoom out') },
              ],
            },
          ]}
        />
        <button
          className="nc-button"
          ref={setCompactMenuAnchor}
          onClick={() => setCompactMenuOpen(!compactMenuOpen)}
        >
          Compact Menu
        </button>
        <ContextMenu
          open={compactMenuOpen}
          onClose={() => setCompactMenuOpen(false)}
          anchor={compactMenuAnchor}
          className="dev-compact-menu"
          aria-label="Compact actions"
          options={[
            { id: 'compact-copy', label: 'Copy', shortcut: 'Ctrl+C', onClick: () => alert('Copy') },
            { id: 'compact-cut', label: 'Cut', shortcut: 'Ctrl+X', onClick: () => alert('Cut') },
            { id: 'compact-paste', label: 'Paste', shortcut: 'Ctrl+V', onClick: () => alert('Paste') },
          ]}
        />
      </div>
    </section>
  );
}
