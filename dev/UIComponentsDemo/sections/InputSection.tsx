import { useState } from 'react';
import { Input } from '../../../src';

export function InputSection() {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [multilineValue, setMultilineValue] = useState('');

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
        <Input
          value={password}
          onChange={setPassword}
          placeholder="Enter password"
          type="password"
          showPasswordToggle
          label="Password Input"
        />
        <Input
          value={password}
          onChange={setPassword}
          placeholder="Small password"
          type="password"
          showPasswordToggle
          size="small"
          label="Small Password Input"
        />
        <Input
          value={multilineValue}
          onChange={setMultilineValue}
          placeholder="Enter multiple lines..."
          multiline
          rows={4}
          label="Multiline Input"
        />
        <Input
          value={multilineValue}
          onChange={setMultilineValue}
          placeholder="Small multiline"
          multiline
          rows={3}
          size="small"
          label="Small Multiline Input"
        />
      </div>
    </section>
  );
}
