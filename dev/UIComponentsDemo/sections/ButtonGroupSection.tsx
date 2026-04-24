import { useState } from 'react';
import { ButtonGroup } from '../../../src';

export function ButtonGroupSection() {
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

  return (
    <section className="dev-section">
      <h2>ButtonGroup</h2>
      <div className="dev-col">
        <ButtonGroup
          value={alignment}
          onChange={setAlignment}
          options={[
            { key: 'left', label: 'Left' },
            { key: 'center', label: 'Center' },
            { key: 'right', label: 'Right' },
          ]}
        />
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
        <ButtonGroup
          value="option1"
          onChange={() => { }}
          options={[
            { key: 'option1', label: 'Option 1' },
            { key: 'option2', label: 'Option 2' },
          ]}
          disabled
        />
      </div>
    </section>
  );
}
