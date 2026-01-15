import { useState } from 'react';
import { ComboBox } from '../../../src';

export function ComboBoxSection() {
  const [comboValue, setComboValue] = useState<string | undefined>('opt1');
  const [comboValue2, setComboValue2] = useState<string | undefined>();
  const [comboValue3, setComboValue3] = useState<string | undefined>('alice');
  const [comboValue4, setComboValue4] = useState<string | undefined>('opt1');

  const comboOptions = [
    { label: 'Option 1', value: 'opt1', default: true },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
    { label: 'Long Option Name Here', value: 'opt4' },
  ];

  const largeOptions = [
    { label: 'Alice Anderson', value: 'alice' },
    { label: 'Bob Brown', value: 'bob' },
    { label: 'Charlie Clark', value: 'charlie' },
    { label: 'David Davis', value: 'david' },
    { label: 'Eve Evans', value: 'eve' },
    { label: 'Frank Franklin', value: 'frank' },
    { label: 'Grace Garcia', value: 'grace' },
    { label: 'Henry Harris', value: 'henry' },
    { label: 'Ivy Ivanova', value: 'ivy' },
    { label: 'Jack Jackson', value: 'jack' },
    { label: 'Kelly King', value: 'kelly' },
    { label: 'Liam Lee', value: 'liam' },
    { label: 'Molly Miller', value: 'molly' },
    { label: 'Nathan Nelson', value: 'nathan' },
    { label: 'Olivia Ortiz', value: 'olivia' },
    { label: 'Peter Parker', value: 'peter' },
    { label: 'Quinn Quigley', value: 'quinn' },
    { label: 'Robert Reed', value: 'robert' },
    { label: 'Sophia Scott', value: 'sophia' },
    { label: 'Thomas Taylor', value: 'thomas' },
    { label: 'Ursula Underwood', value: 'ursula' },
    { label: 'Victor Vance', value: 'victor' },
    { label: 'Wendy White', value: 'wendy' },
    { label: 'Xavier Xu', value: 'xavier' },
    { label: 'Yvonne Young', value: 'yvonne' },
    { label: 'Zane Zimmerman', value: 'zane' },
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
          options={largeOptions}
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
