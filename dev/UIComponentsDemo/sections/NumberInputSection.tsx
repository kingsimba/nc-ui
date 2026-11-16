import { useState } from 'react';
import { NumberInput } from '../../../src';

export function NumberInputSection() {
  const [numberValue, setNumberValue] = useState(50);
  const [confirmedValue, setConfirmedValue] = useState(50);
  const [draftCalls, setDraftCalls] = useState(0);
  const [confirmedCalls, setConfirmedCalls] = useState(0);
  const [optionalValue, setOptionalValue] = useState<number | undefined>(undefined);

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

      <h3 style={{ marginTop: 24 }}>Confirmed changes</h3>
      <p style={{ marginBottom: 12, color: 'var(--nc-text-weak)' }}>
        <code>onChange</code> is the draft callback: it fires per keystroke while typing and per step while dragging the
        spinner. <code>onChangeConfirmed</code> fires once when the edit is committed — on Enter, on blur, on a spinner
        click, or when a drag is released — so expensive work (requests, disk writes) belongs there.
      </p>
      <div className="dev-col">
        <NumberInput
          value={confirmedValue}
          onChange={() => setDraftCalls(draftCalls + 1)}
          onChangeConfirmed={(value) => {
            setConfirmedValue(value ?? 0);
            setConfirmedCalls(confirmedCalls + 1);
          }}
          min={0}
          max={100}
          label="Drag, type, then press Enter"
          style={{ width: 220 }}
        />
        <p style={{ color: 'var(--nc-text-weak)' }}>
          value: <code>{confirmedValue}</code> · onChange: <code>{draftCalls}</code> · onChangeConfirmed:{' '}
          <code>{confirmedCalls}</code>
        </p>
      </div>

      <h3 style={{ marginTop: 24 }}>Optional value</h3>
      <p style={{ marginBottom: 12, color: 'var(--nc-text-weak)' }}>
        With <code>allowEmpty</code>, clearing the field reports <code>undefined</code> through{' '}
        <code>onChangeConfirmed</code> instead of falling back to <code>min</code> or <code>0</code>. Escape cancels the
        edit and fires <code>onCancel</code>.
      </p>
      <div className="dev-col">
        <NumberInput
          value={optionalValue}
          onChangeConfirmed={setOptionalValue}
          onCancel={() => setOptionalValue(undefined)}
          allowEmpty
          placeholder="No limit"
          ariaLabel="Request timeout"
          min={1}
          max={999}
          label="Timeout (empty = no limit)"
          style={{ width: 220 }}
        />
        <p style={{ color: 'var(--nc-text-weak)' }}>
          value: <code>{optionalValue === undefined ? 'undefined' : optionalValue}</code>
        </p>
      </div>
    </section>
  );
}
