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
          onChange={() => {}}
          options={['option1', 'option2'] as const}
          disabled
        />
      </div>
    </section>
  );
}
