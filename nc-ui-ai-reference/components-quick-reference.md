# nc-ui Components Quick Reference

> **When to use:** Always use nc-ui components instead of native HTML elements

## Import Patterns

```tsx
// Main components
import { Button, Input, ComboBox, Dialog, ... } from '@kingsimba/nc-ui'
import '@kingsimba/nc-ui/styles.css'

// Icons (separate entry point for bundle optimization)
import { CloseIcon, EditIcon, TrashIcon } from '@kingsimba/nc-ui/icons'

// YAML editor (optional)
import { YamlTextArea } from '@kingsimba/nc-ui/yaml'
```

---

## Core Components

### Button
**Replace:** `<button>` → `<Button>`

```tsx
import { Button } from '@kingsimba/nc-ui'

// Basic
<Button onClick={handleClick}>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="danger">Delete</Button>
<Button variant="warning">Warning</Button>
<Button variant="success">Success</Button>
<Button variant="ghost">Subtle</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="default">Default</Button>
<Button size="large">Large</Button>

// States
<Button loading>Saving...</Button>
<Button disabled>Disabled</Button>
<Button block>Full Width</Button>

// All standard button props work
<Button type="submit" form="myForm">Submit</Button>
```

**Props:** `variant`, `size`, `loading`, `disabled`, `block`, `textSelectable`, + all HTMLButtonElement props

---

### Input
**Replace:** `<input>` / `<textarea>` → `<Input>`

```tsx
import { Input } from '@kingsimba/nc-ui'

// Text input
<Input
  value={text}
  onChange={setText}
  placeholder="Enter text..."
  clearable
/>

// With label
<Input
  label="Username"
  value={username}
  onChange={setUsername}
/>

// Password with toggle
<Input
  type="password"
  showPasswordToggle
  value={password}
  onChange={setPassword}
/>

// Multiline (textarea)
<Input
  multiline
  rows={4}
  value={description}
  onChange={setDescription}
/>

// Small size
<Input size="small" value={...} onChange={...} />

// With Enter key handler
<Input
  value={search}
  onChange={setSearch}
  onEnter={handleSearch}
  placeholder="Press Enter to search"
/>

// With validation
<Input
  value={email}
  onChange={setEmail}
  validator={(value) => {
    if (!value) return null;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
      ? null 
      : 'Invalid email address';
  }}
  placeholder="Enter email"
/>
```

**Props:** `value`, `onChange`, `onEnter`, `onClear`, `placeholder`, `disabled`, `label`, `clearable`, `type`, `size`, `showPasswordToggle`, `multiline`, `rows`, `validator`

---

### ComboBox
**Replace:** `<select>` → `<ComboBox>`

```tsx
import { ComboBox } from '@kingsimba/nc-ui'

// Basic
<ComboBox
  value={selected}
  onChange={setSelected}
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Default Option', value: '3', default: true }
  ]}
/>

// With search/filter
<ComboBox
  allowTyping
  options={longOptionsList}
  value={selected}
  onChange={setSelected}
/>

// With label
<ComboBox
  label="Select country"
  options={countries}
  value={country}
  onChange={setCountry}
/>

// Not clearable (always has value)
<ComboBox
  clearable={false}
  options={[...]}
/>

// Small size
<ComboBox size="small" options={[...]} />

// Placement
<ComboBox placement="top" options={[...]} />
```

**Props:** `value`, `onChange`, `options`, `placeholder`, `disabled`, `label`, `clearable`, `allowTyping`, `placement`, `size`

**Option type:** `{ label: string, value: string, default?: boolean }`

---

### MultiSelect
**Replace:** Multi-select `<select multiple>` → `<MultiSelect>`

```tsx
import { MultiSelect } from '@kingsimba/nc-ui'

<MultiSelect
  values={selectedIds}
  onChange={setSelectedIds}
  options={[
    { label: 'Tag 1', value: '1' },
    { label: 'Tag 2', value: '2' },
  ]}
  placeholder="Select tags..."
/>
```

**Props:** `values` (array), `onChange`, `options`, `placeholder`, `disabled`

---

### NumberInput
**Replace:** `<input type="number">` → `<NumberInput>`

```tsx
import { NumberInput } from '@kingsimba/nc-ui'

<NumberInput
  value={count}
  onChange={setCount}
  min={0}
  max={100}
  step={1}
/>

// With label
<NumberInput
  label="Quantity"
  value={qty}
  onChange={setQty}
/>
```

**Props:** `value`, `onChange`, `min`, `max`, `step`, `label`, `disabled`

---

### Dialog
**Replace:** Custom modals → `<Dialog>`

```tsx
import { Dialog } from '@kingsimba/nc-ui'

<Dialog
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Confirm Delete"
  footer={
    <>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
  <p>This action cannot be undone.</p>
</Dialog>

// Without footer
<Dialog
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Information"
>
  <p>Your data has been saved.</p>
</Dialog>
```

**Props:** `open`, `onClose`, `title`, `footer`, `children`

---

## Form Controls

### Checkbox

```tsx
import { Checkbox } from '@kingsimba/nc-ui'

<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="I agree to the terms"
/>

// Indeterminate state
<Checkbox
  checked={someChecked}
  indeterminate={someChecked && !allChecked}
  onChange={toggleAll}
  label="Select all"
/>
```

**Props:** `checked`, `onChange`, `label`, `indeterminate`, `disabled`

---

### Toggle (Switch)

```tsx
import { Toggle } from '@kingsimba/nc-ui'

<Toggle
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>

<Toggle
  checked={darkMode}
  onChange={setDarkMode}
  disabled={loading}
/>
```

**Props:** `checked`, `onChange`, `label`, `disabled`

---

### Slider

```tsx
import { Slider } from '@kingsimba/nc-ui'

<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  label="Volume"
/>
```

**Props:** `value`, `onChange`, `min`, `max`, `label`, `disabled`

---

## Display Components

### Alert

```tsx
import { Alert } from '@kingsimba/nc-ui'

<Alert type="info" onClose={() => setShowInfo(false)}>
  This is an informational message.
</Alert>

<Alert type="success">
  Your changes have been saved!
</Alert>

<Alert type="warning">
  Please review your input.
</Alert>

<Alert type="error">
  An error occurred. Please try again.
</Alert>
```

**Props:** `type` ('info' | 'success' | 'warning' | 'error'), `onClose`, `children`

---

### ActivityIndicator (Spinner)

```tsx
import { ActivityIndicator } from '@kingsimba/nc-ui'

// Inline spinner
<ActivityIndicator />
<ActivityIndicator size="small" />
<ActivityIndicator size="large" />

// Custom color
<ActivityIndicator color="#3b82f6" />

// Full-screen overlay
<ActivityIndicator overlay />
```

**Props:** `size`, `color`, `overlay`, `className`

---

### Battery

```tsx
import { Battery } from '@kingsimba/nc-ui'

<Battery level={75} />
<Battery level={15} charging />
```

**Props:** `level` (0-100), `charging`

---

### Notification (Toast)

```tsx
import { showNotification } from '@kingsimba/nc-ui'

// Success
showNotification({
  message: 'Item saved successfully',
  type: 'success',
  duration: 3000,
})

// Error
showNotification({
  message: 'Failed to save item',
  type: 'error',
  duration: 5000,
})

// Info
showNotification({
  message: 'Loading your data...',
  type: 'info',
})

// Warning
showNotification({
  message: 'Please review your changes',
  type: 'warning',
})
```

---

## Layout Components

### ButtonGroup

```tsx
import { ButtonGroup } from '@kingsimba/nc-ui'

<ButtonGroup>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</ButtonGroup>

// Vertical
<ButtonGroup vertical>
  <Button>Top</Button>
  <Button>Middle</Button>
  <Button>Bottom</Button>
</ButtonGroup>
```

**Props:** `vertical`, `children`

---

### ListGroup

```tsx
import { ListGroup } from '@kingsimba/nc-ui'

<ListGroup>
  <div className="nc-list-group-item">Item 1</div>
  <div className="nc-list-group-item nc-active">Active Item</div>
  <div className="nc-list-group-item">Item 3</div>
</ListGroup>
```

---

### Tabs

```tsx
import { Tabs } from '@kingsimba/nc-ui'

<Tabs
  activeTab={activeTab}
  onChange={setActiveTab}
  tabs={[
    { id: 'home', label: 'Home', content: <HomePage /> },
    { id: 'settings', label: 'Settings', content: <SettingsPage /> },
    { id: 'about', label: 'About', content: <AboutPage /> },
  ]}
/>
```

**Props:** `activeTab`, `onChange`, `tabs` (array of `{ id, label, content }`)

---

## Advanced Components

### NavStack
Mobile-style stacked navigation:

```tsx
import { NavStack } from '@kingsimba/nc-ui'

function SettingsApp() {
  return (
    <NavStack
      pages={[
        {
          id: 'home',
          title: 'Settings',
          render: () => <SettingsHome />
        },
        {
          id: 'profile',
          title: 'Profile',
          render: () => <ProfileSettings />
        }
      ]}
    />
  )
}
```

---

### ContextMenu
Right-click menus:

```tsx
import { ContextMenu } from '@kingsimba/nc-ui'

<ContextMenu
  items={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete, danger: true },
    { type: 'separator' },
    { label: 'Export', onClick: handleExport },
  ]}
>
  <div>Right-click me</div>
</ContextMenu>
```

---

### YamlTextArea
YAML editor with syntax highlighting:

```tsx
import { YamlTextArea } from '@kingsimba/nc-ui/yaml'

<YamlTextArea
  value={yamlString}
  onChange={setYamlString}
  onParse={setParsedYaml}
  height={400}
/>
```

**Props:** `value`, `onChange`, `onParse`, `height`, `readOnly`

---

## Pre-configured Components

### CommonButtons
Ready-to-use icon buttons:

```tsx
import { CommonButtons } from '@kingsimba/nc-ui'

const { CloseButton, EditButton, RefreshButton, TrashButton } = CommonButtons

<CloseButton onClick={handleClose} />
<EditButton onClick={handleEdit} />
<RefreshButton onClick={handleRefresh} loading={isRefreshing} />
<TrashButton onClick={handleDelete} />
```

---

## Icons

```tsx
import {
  CloseIcon,
  EditIcon,
  TrashIcon,
  ViewIcon,
  EyeHiddenIcon,
  SettingsIcon,
  // ... 50+ more icons
} from '@kingsimba/nc-ui/icons'

<CloseIcon />
<CloseIcon size={24} />
<CloseIcon color="#3b82f6" />
<CloseIcon className="custom-class" />
```

**Common icons:** Close, Edit, Trash, View, EyeHidden, Settings, Plus, Minus, Check, Arrow (Up/Down/Left/Right), Menu, Search, Download, Upload, etc.

---

## Migration Quick Reference

| HTML Element | nc-ui Component |
|--------------|----------------|
| `<button>` | `<Button>` |
| `<input type="text">` | `<Input>` |
| `<input type="password">` | `<Input type="password">` |
| `<input type="number">` | `<NumberInput>` |
| `<textarea>` | `<Input multiline>` |
| `<select>` | `<ComboBox>` |
| `<select multiple>` | `<MultiSelect>` |
| `<input type="checkbox">` | `<Checkbox>` |
| `<input type="range">` | `<Slider>` |
| Custom modal | `<Dialog>` |
| Custom toast | `showNotification()` |

---

## TypeScript Support

All components export their props interfaces:

```tsx
import type {
  ButtonProps,
  InputProps,
  ComboBoxProps,
  DialogProps,
  // ... etc
} from '@kingsimba/nc-ui'

// Extend or reuse in your components
interface MyCustomButtonProps extends ButtonProps {
  customProp: string
}
```

---

## Styling

All components use `nc-` prefixed classes and CSS variables. See `architecture.md` for theming details.

```css
/* Override theme */
:root {
  --nc-primary: #your-color;
  --nc-danger: #your-danger-color;
}

/* Custom component styles */
.nc-button.my-custom-button {
  /* your overrides */
}
```
