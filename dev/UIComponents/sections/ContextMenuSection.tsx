import { useState } from 'react';
import { ContextMenu } from '../../../src';
import { ViewIcon, EditIcon, TrashIcon } from '../../../src/components/icons';

export function ContextMenuSection() {
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [contextMenuAnchor, setContextMenuAnchor] = useState<HTMLButtonElement | null>(null);

  return (
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
              onClick: () => {},
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
