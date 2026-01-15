import { useState } from 'react';
import { ComboBox } from '../../../src';

export function ComboBoxSection() {
  const [comboValue, setComboValue] = useState<string | undefined>('opt1');
  const [comboValue2, setComboValue2] = useState<string | undefined>();
  const [comboValue3, setComboValue3] = useState<string | undefined>('opt1');
  const [comboValue4, setComboValue4] = useState<string | undefined>('opt1');

  const comboOptions = [
    { label: 'Option 1', value: 'opt1', default: true },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
    { label: 'Long Option Name Here', value: 'opt4' },
  ];

  return (
    <section className="dev-section">
      <h2>ComboBox</h2>
      <div className="dev-col" style={{ maxWidth: 300 }}>
        <ComboBox
          label="Default ComboBox"
          options={comboOptions}
          value={comboValue}
          onChange={setComboValue}
          placeholder="Select an option..."
        />
        <ComboBox
          label="Small ComboBox"
          options={comboOptions}
          value={comboValue2}
          onChange={setComboValue2}
          size="small"
          placeholder="Select..."
        />
        <ComboBox
          label="With Typing"
          options={comboOptions}
          value={comboValue3}
          onChange={setComboValue3}
          allowTyping
          placeholder="Type to search..."
        />
        <ComboBox
          label="Non-clearable"
          options={comboOptions}
          value={comboValue4}
          onChange={setComboValue4}
          clearable={false}
        />
      </div>
    </section>
  );
}
