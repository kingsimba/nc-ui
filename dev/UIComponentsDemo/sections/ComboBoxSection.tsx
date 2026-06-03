import { useState, useCallback } from 'react';
import { ComboBox, ComboBoxOption } from '../../../src';

export function ComboBoxSection() {
  const [comboValue, setComboValue] = useState<string | undefined>('opt1');
  const [comboValue2, setComboValue2] = useState<string | undefined>();
  const [comboValue3, setComboValue3] = useState<string | undefined>('alice');
  const [comboValue4, setComboValue4] = useState<string | undefined>('opt1');
  const [comboValue5, setComboValue5] = useState<string | undefined>('opt2');
  const [comboValue6, setComboValue6] = useState<string | undefined>('opt3');
  const [fruitValue, setFruitValue] = useState<string | undefined>();
  const [fruitValue2, setFruitValue2] = useState<string | undefined>('strawberry');

  const fancyFruits: (ComboBoxOption & { icon: string; description: string })[] = [
    { label: 'Apple', value: 'apple', icon: '🍎', description: 'Crisp and refreshing' },
    { label: 'Apricot', value: 'apricot', icon: '🟠', description: 'Sweet with a tangy twist' },
    { label: 'Avocado', value: 'avocado', icon: '🥑', description: 'Creamy and versatile' },
    { label: 'Banana', value: 'banana', icon: '🍌', description: 'Instant energy boost' },
    { label: 'Blueberry', value: 'blueberry', icon: '🫐', description: 'Antioxidant powerhouse' },
    { label: 'Cherry', value: 'cherry', icon: '🍒', description: 'Deep red summer delight' },
    { label: 'Coconut', value: 'coconut', icon: '🥥', description: 'Tropical and hydrating' },
    { label: 'Date', value: 'date', icon: '🟤', description: 'Naturally caramel-sweet' },
    { label: 'Dragon Fruit', value: 'dragonfruit', icon: '🐉', description: 'Vibrant and exotic' },
    { label: 'Fig', value: 'fig', icon: '🟤', description: 'Honeyed and delicate' },
    { label: 'Grape', value: 'grape', icon: '🍇', description: 'Perfect little bites' },
    { label: 'Kiwi', value: 'kiwi', icon: '🥝', description: 'Fuzzy on the outside, green inside' },
    { label: 'Lemon', value: 'lemon', icon: '🍋', description: 'Bright and citrusy' },
    { label: 'Mango', value: 'mango', icon: '🥭', description: 'Tropical sunshine in a peel' },
    { label: 'Orange', value: 'orange', icon: '🍊', description: 'Classic citrus goodness' },
    { label: 'Papaya', value: 'papaya', icon: '🟠', description: 'Buttery and exotic' },
    { label: 'Peach', value: 'peach', icon: '🍑', description: 'Summer in your hand' },
    { label: 'Pear', value: 'pear', icon: '🍐', description: 'Elegantly sweet' },
    { label: 'Pineapple', value: 'pineapple', icon: '🍍', description: 'Spiky tropical treasure' },
    { label: 'Plum', value: 'plum', icon: '🟣', description: 'Velvety and rich' },
    { label: 'Pomegranate', value: 'pomegranate', icon: '🔴', description: 'Crown of jewel seeds' },
    { label: 'Strawberry', value: 'strawberry', icon: '🍓', description: 'Everyone favorite berry' },
    { label: 'Watermelon', value: 'watermelon', icon: '🍉', description: 'Summer hydration hero' },
  ];

  const fruitCandidates = useCallback(async (query: string): Promise<ComboBoxOption[]> => {
    await new Promise((r) => setTimeout(r, 200));
    const q = query.toLowerCase();
    return fancyFruits.filter((f) =>
      f.value.includes(q) || f.label.toLowerCase().includes(q)
    );
  }, []);

  const renderFruitOption = (option: ComboBoxOption, _index: number, highlighted: boolean) => {
    const fruit = fancyFruits.find(f => f.value === option.value)!;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 2px' }}>
        <span style={{ fontSize: 22, lineHeight: 1 }}>{fruit.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: highlighted ? 600 : 400, color: 'var(--nc-text)', fontSize: 14 }}>
            {fruit.label}
          </div>
          <div style={{ fontSize: 12, color: 'var(--nc-text-weak)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {fruit.description}
          </div>
        </div>
      </div>
    );
  };

  const renderFruitSelected = (option: ComboBoxOption) => {
    const fruit = fancyFruits.find(f => f.value === option.value);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {fruit && <span style={{ fontSize: 18, lineHeight: 1 }}>{fruit.icon}</span>}
        <span>{option.label}</span>
      </div>
    );
  };

  const comboOptions = [
    { label: 'Option 1', value: 'opt1', default: true },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3', disabled: true },
    { label: 'Long Option Name Here', value: 'opt4' },
  ];

  const largeOptions = [
    { label: 'Alice Anderson', value: 'alice' },
    { label: 'Bob Brown', value: 'bob' },
    { label: 'Charlie Clark', value: 'charlie', disabled: true },
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
      <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
        Use <code>textAlign</code> when the closed control should read like a compact pill or toolbar item rather than a form field.
      </p>

      <h3>Disabled Options</h3>
      <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
        Set <code>disabled: true</code> on any option to prevent selection. Disabled options are visually faded (opacity 0.4),
        skipped by arrow key navigation, and cannot be selected via click or Enter. They remain visible in the dropdown
        for context.
      </p>
      <div className="dev-col" style={{ maxWidth: 300 }}>
        <ComboBox
          label="Disabled options demo"
          options={comboOptions}
          value={comboValue4}
          onChange={setComboValue4}
        />
      </div>

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
        <div className="card" style={{ display: 'grid', gap: 10 }}>
          <span className="nc-label">Plain appearance</span>
          <p className="weak" style={{ margin: 0 }}>
            Closed state reads like plain text. Click to open the picker, use Escape to close it, and show the standard control border while active.
          </p>
          <ComboBox
            options={comboOptions}
            value={comboValue6}
            onChange={setComboValue6}
            appearance="plain"
            clearable={false}
          />
        </div>
        <div className="card" style={{ display: 'grid', gap: 10 }}>
          <span className="nc-label">Server-Side Candidates</span>
          <p className="weak" style={{ margin: 0 }}>
            Type to fetch options from a simulated server with 200ms delay. Uses <code>candidates</code> + <code>renderOption</code> for a rich, customized dropdown.
          </p>
          <ComboBox
            candidates={fruitCandidates}
            renderOption={renderFruitOption}
            value={fruitValue}
            onChange={setFruitValue}
            placeholder="Search fruits..."
          />
          <p className="weak" style={{ margin: 0 }}>
            Selected: <strong>{fruitValue || '(none)'}</strong>
          </p>
        </div>
        <div className="card" style={{ display: 'grid', gap: 10 }}>
          <span className="nc-label">Server-Side Candidates with Selected Icon</span>
          <p className="weak" style={{ margin: 0 }}>
            Uses <code>renderSelected</code> to show the fruit icon in the closed input, and <code>selectedOption</code> to provide the initial option data when the value is set before candidates load.
          </p>
          <ComboBox
            candidates={fruitCandidates}
            renderOption={renderFruitOption}
            renderSelected={renderFruitSelected}
            selectedOption={fruitValue2 ? fancyFruits.find(f => f.value === fruitValue2) : undefined}
            value={fruitValue2}
            onChange={setFruitValue2}
            placeholder="Search fruits..."
          />
          <p className="weak" style={{ margin: 0 }}>
            Selected: <strong>{fruitValue2 || '(none)'}</strong>
          </p>
        </div>
        <div style={{ background: 'var(--nc-primary)', padding: 16, borderRadius: 8 }}>
          <ComboBox
            label="Transparent appearance"
            options={comboOptions}
            value={comboValue}
            onChange={setComboValue}
            appearance="transparent"
            clearable={false}
          />
        </div>
        <div style={{ background: 'var(--nc-primary)', padding: 16, borderRadius: 8 }}>
          <ComboBox
            label="Centered toolbar text"
            options={comboOptions}
            value={comboValue5}
            onChange={setComboValue5}
            appearance="transparent"
            clearable={false}
            size="small"
            textAlign="center"
            style={{ width: 140 }}
          />
        </div>
      </div>
    </section>
  );
}
