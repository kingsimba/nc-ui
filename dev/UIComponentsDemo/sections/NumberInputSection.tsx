import { useState } from 'react';
import { NumberInput } from '../../../src';

export function NumberInputSection() {
  const [numberValue, setNumberValue] = useState(50);

  return (
    <section className="dev-section">
      <h2>NumberInput</h2>
      <div className="dev-col">
        <NumberInput
          value={numberValue}
          onChange={setNumberValue}
          min={0}
          max={100}
          label="Default (0-100)"
        />
        <NumberInput
          value={numberValue}
          onChange={setNumberValue}
          min={0}
          max={100}
          step={5}
          size="small"
          label="Small with step=5"
        />
      </div>
    </section>
  );
}
