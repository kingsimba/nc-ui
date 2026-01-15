import { useState } from 'react';
import { Input } from '../../../src';

export function InputSection() {
  const [inputValue, setInputValue] = useState('');

  return (
    <section className="dev-section">
      <h2>Input</h2>
      <div className="dev-col">
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="Type something..."
          label="Default Input"
        />
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="Small input"
          size="small"
          label="Small Input"
        />
        <Input
          value="Disabled"
          disabled
          label="Disabled Input"
        />
      </div>
    </section>
  );
}
