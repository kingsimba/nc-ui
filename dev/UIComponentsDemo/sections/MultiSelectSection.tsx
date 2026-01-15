import { useState } from 'react';
import { MultiSelect } from '../../../src';

export function MultiSelectSection() {
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>(['opt1']);

  const comboOptions = [
    { label: 'Option 1', value: 'opt1', default: true },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
    { label: 'Long Option Name Here', value: 'opt4' },
  ];

  return (
    <section className="dev-section">
      <h2>MultiSelect</h2>
      <div className="dev-col">
        <MultiSelect
          values={multiSelectValues}
          onChange={setMultiSelectValues}
          options={comboOptions}
          label="Select multiple options"
        />
      </div>
    </section>
  );
}
