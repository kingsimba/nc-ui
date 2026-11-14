import { useState } from 'react';
import { ContextMenu } from '../../../src';
import { ViewIcon, EditIcon, TrashIcon } from '../../../src/components/icons';

export function ContextMenuSection() {
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const [showDetails, setShowDetails] = useState(true);
  const [contextMenuAnchor, setContextMenuAnchor] = useState<HTMLButtonElement | null>(null);

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
      </div>
    </section>
  );
}
