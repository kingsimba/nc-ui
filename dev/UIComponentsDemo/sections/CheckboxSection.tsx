import { useState } from 'react';
import { Checkbox } from '../../../src';

export function CheckboxSection() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  return (
    <section className="dev-section">
      <h2>Checkbox</h2>
      <div className="dev-col">
        <Checkbox
          checked={checked1}
          onChange={setChecked1}
          label="Default checkbox"
        />
        <Checkbox
          checked={checked2}
          onChange={setChecked2}
          label="Checked checkbox"
        />
        <Checkbox
          checked={checked3}
          onChange={setChecked3}
          label="Small checkbox"
          size="small"
        />
        <Checkbox
          checked={true}
          onChange={() => {}}
          label="Disabled checkbox"
          disabled
        />
      </div>
    </section>
  );
}
