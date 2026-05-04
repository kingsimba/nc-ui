import { useState } from 'react';
import { ButtonGroup } from '../../../src';

export function ButtonGroupSection() {
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

  return (
    <section className="dev-section">
      <h2>ButtonGroup</h2>
      <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
        Use ButtonGroup for compact mutually exclusive choices like alignment modes, filters, or access levels.
      </p>
      <div className="dev-col" style={{ gap: 20 }}>
        <div>
          <h4 style={{ marginBottom: 8, color: 'var(--nc-text-weak)', fontSize: 13 }}>Default</h4>
          <ButtonGroup
            value={alignment}
            onChange={setAlignment}
            options={[
              { key: 'left', label: 'Left' },
              { key: 'center', label: 'Center' },
              { key: 'right', label: 'Right' },
            ]}
          />
        </div>
        <div>
          <h4 style={{ marginBottom: 8, color: 'var(--nc-text-weak)', fontSize: 13 }}>Small</h4>
          <ButtonGroup
            value={alignment}
            onChange={setAlignment}
            options={[
              { key: 'left', label: 'Left' },
              { key: 'center', label: 'Center' },
              { key: 'right', label: 'Right' },
            ]}
            size="small"
          />
        </div>
        <div>
          <h4 style={{ marginBottom: 8, color: 'var(--nc-text-weak)', fontSize: 13 }}>Disabled</h4>
          <ButtonGroup
            value="option1"
            onChange={() => {}}
            options={[
              { key: 'option1', label: 'Option 1' },
              { key: 'option2', label: 'Option 2' },
            ]}
            disabled
          />
        </div>
        <div>
          <h4 style={{ marginBottom: 8, color: 'var(--nc-text-weak)', fontSize: 13 }}>Option-level Disabled</h4>
          <ButtonGroup
            value={alignment}
            onChange={setAlignment}
            options={[
              { key: 'left', label: 'Left' },
              { key: 'center', label: 'Center', disabled: true },
              { key: 'right', label: 'Right' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
