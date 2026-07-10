import { useState } from 'react';
import { NumberInput } from '../../../src';

export function NumberInputSection() {
  const [numberValue, setNumberValue] = useState(50);

  return (
    <section className="dev-section">
      <h2>NumberInput</h2>
      <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
        Click an arrow to change by one step, or drag the spinner up or down for continuous adjustment.
      </p>
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
        <NumberInput
          value={numberValue}
          onChange={setNumberValue}
          min={0}
          max={100}
          label="Custom width"
          style={{ width: 220 }}
        />
      </div>
    </section>
  );
}
