import { useState } from 'react';
import { Checkbox } from '../../../src';

const TRI_STATE_LABELS = ['Inbox', 'Drafts', 'Sent'];

export function CheckboxSection() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState([true, false, true]);

  const allSelected = selectedFolders.every(Boolean);
  const someSelected = selectedFolders.some(Boolean);

  const setFolder = (index: number, value: boolean) => {
    setSelectedFolders(selectedFolders.map((current, i) => (i === index ? value : current)));
  };

  return (
    <section className="dev-section">
      <h2>Checkbox</h2>
      <div className="dev-row">
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
      </div>
      <div className="dev-row">
        <Checkbox
          checked={checked3}
          onChange={setChecked3}
          label="Small checkbox"
          size="small"
        />
        <Checkbox
          checked={true}
          onChange={() => { }}
          label="Disabled checkbox"
          disabled
        />
      </div>
      <div className="dev-row">
        <Checkbox
          checked={checked1}
          onChange={setChecked1}
          label="Tiny checkbox"
          size="tiny"
        />
        <Checkbox
          checked={true}
          onChange={() => { }}
          label="Tiny checked"
          size="tiny"
        />
      </div>

      <h3 style={{ marginTop: 24 }}>Indeterminate (select all)</h3>
      <p style={{ marginBottom: 12, color: 'var(--nc-text-weak)' }}>
        Set <code>indeterminate</code> while only some items are selected. It draws a dash and reports{' '}
        <code>aria-checked="mixed"</code>. Clicking still calls <code>onChange(!checked)</code>, so the parent decides
        whether to clear or select everything.
      </p>
      <div className="dev-col">
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected && !allSelected}
          onChange={(value) => setSelectedFolders(TRI_STATE_LABELS.map(() => value))}
          label="Select all folders"
        />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 28 }}>
          {TRI_STATE_LABELS.map((label, index) => (
            <Checkbox
              key={label}
              checked={selectedFolders[index]}
              onChange={(value) => setFolder(index, value)}
              label={label}
              size="small"
            />
          ))}
        </div>
        <div className="dev-row">
          <Checkbox
            checked={false}
            indeterminate={true}
            onChange={() => { }}
            label="Indeterminate alone"
            size="small"
          />
          <Checkbox
            checked={false}
            indeterminate={true}
            onChange={() => { }}
            label="Tiny indeterminate"
            size="tiny"
          />
        </div>
      </div>
    </section>
  );
}
