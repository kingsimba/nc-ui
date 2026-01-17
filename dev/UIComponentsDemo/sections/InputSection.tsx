import { useState } from 'react';
import { Input } from '../../../src';

export function InputSection() {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [multilineValue, setMultilineValue] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const emailValidator = (value: string) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
  };

  const usernameValidator = (value: string) => {
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (value.length > 20) return 'Username must be less than 20 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
    return null;
  };

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
        <Input
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          type="email"
          validator={emailValidator}
          label="Email with Validator"
        />
        <Input
          value={username}
          onChange={setUsername}
          placeholder="Enter username"
          validator={usernameValidator}
          label="Username with Validator"
        />
      </div>
    </section>
  );
}
