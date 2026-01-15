import { useState } from 'react';
import { Toggle } from '../../../src';

export function ToggleSection() {
  const [toggleChecked, setToggleChecked] = useState(false);

  return (
    <section className="dev-section">
      <h2>Toggle</h2>
      <div className="dev-row">
        <Toggle
          checked={toggleChecked}
          onChange={setToggleChecked}
          label="Enable feature"
        />
        <Toggle
          checked={true}
          onChange={() => {}}
          disabled
          label="Disabled on"
        />
      </div>
    </section>
  );
}
