import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { t } from '../lib/i18n';

export type ComboBoxOption = { label: string; value: string; default?: boolean };

export interface ComboBoxProps {
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string | undefined) => void;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Available options */
  options: ComboBoxOption[];
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Whether the selection can be cleared */
  clearable?: boolean;
  /** Whether typing to filter is allowed */
  allowTyping?: boolean;
  /** Dropdown placement preference */
  placement?: 'top' | 'bottom';
  /** Size variant */
  size?: 'default' | 'small';
  /** Custom styles */
  style?: React.CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

function DropdownOption({ option, onChange, selected, small }: { option: ComboBoxOption; onChange: (value: string) => void; selected?: boolean; small?: boolean }) {
  return (
    <div
      className={`nc-combo-dropdown-option ${small ? 'nc-small' : ''}`}
      role="option"
      onMouseDown={() => onChange(option.value)}
      aria-selected={selected}
      style={{
        cursor: 'pointer',
        background: selected ? 'rgba(59,130,246,0.12)' : undefined,
      }}
    >
      {option.label}
      {option.default && (
        <span style={{ fontSize: '0.85em', color: 'var(--nc-text-weak)', marginLeft: 6 }}>
          ({t('default')})
        </span>
      )}
    </div>
  );
}

function DropdownMenu({
  isOpen,
  options,
  onSelect,
  selectedValue,
  placement = 'bottom',
  anchorRef,
  small,
}: {
  isOpen: boolean;
  options: ComboBoxOption[];
  onSelect: (value: string) => void;
  selectedValue?: string;
  placement?: 'top' | 'bottom';
  anchorRef: React.RefObject<HTMLDivElement>;
  small?: boolean;
}) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [autoPlacement, setAutoPlacement] = useState<'top' | 'bottom'>(placement);

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();

      // Auto-detect placement based on available space
      let finalPlacement = placement;
      if (placement === 'bottom') {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        // If not enough space below (< 320px for dropdown) and more space above, use top
        if (spaceBelow < 320 && spaceAbove > spaceBelow) {
          finalPlacement = 'top';
        }
      }

      setAutoPlacement(finalPlacement);
      setPosition({
        top: finalPlacement === 'top' ? rect.top - 4 : rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen, anchorRef, placement]);

  if (!isOpen) return null;

  const dropdown = (
    <div
      className="nc-combo-dropdown"
      style={{
        position: 'fixed',
        top: autoPlacement === 'top' ? undefined : position.top,
        bottom: autoPlacement === 'top' ? window.innerHeight - position.top : undefined,
        left: position.left,
        width: position.width,
        zIndex: 1000,
        maxHeight: 300,
        overflowY: 'auto',
      }}
    >
      {options.length === 0 ? (
        <div className={`nc-combo-dropdown-option nc-no-results ${small ? 'nc-small' : ''}`}>{t('noResults')}</div>
      ) : (
        options.map((o) => (
          <DropdownOption key={o.value} option={o} onChange={onSelect} selected={o.value === selectedValue} small={small} />
        ))
      )}
    </div>
  );

  return createPortal(dropdown, document.body);
}

function ClearButton({ onClick, small }: { onClick: () => void; small?: boolean }) {
  return (
    <button
      className={`nc-button nc-ghost nc-combo-button nc-combo-clear ${small ? 'nc-small' : ''}`}
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      aria-label="Clear selection"
    >
      ✕
    </button>
  );
}

function ToggleButton({ open, onClick, small }: { open: boolean; onClick: () => void; small?: boolean }) {
  return (
    <button
      className={`nc-button nc-ghost nc-combo-button nc-combo-toggle ${small ? 'nc-small' : ''} ${open ? 'nc-open' : ''}`}
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      aria-label={open ? 'Close' : 'Open'}
    >
      ▾
    </button>
  );
}

export function ComboBox({
  value,
  onChange,
  placeholder = 'Select…',
  options,
  disabled,
  label,
  clearable = true,
  allowTyping = false,
  placement = 'bottom',
  size = 'default',
  style,
  className,
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const isSmall = size === 'small';

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!allowTyping) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, allowTyping]);

  // Auto-select first option if not clearable and no value is set
  useEffect(() => {
    if (!clearable && !value && options.length > 0 && onChange) {
      const defaultOption = options.find(o => o.default) || options[0];
      onChange(defaultOption.value);
    }
  }, [clearable, value, options, onChange]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!(e.target instanceof Node)) return;
      if (!inputRef.current) return;
      if (!inputRef.current.parentElement?.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const selected = options.find((o) => o.value === value);
  const showClearButton = selected && clearable;
  const showToggle = !disabled && !showClearButton;

  const overlayVisible = !(open && allowTyping) && !!selected;

  const handleSelect = (newValue: string) => {
    onChange?.(newValue);
    setOpen(false);
    setQuery('');
  };

  const handleClear = () => {
    onChange?.(undefined);
  };

  return (
    <div className={`nc-combo-container ${className || ''}`.trim()} style={{ position: 'relative', ...style }}>
      {label && <span className={`nc-label ${isSmall ? 'nc-small' : ''}`}>{label}</span>}
      <div
        ref={anchorRef}
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        onMouseDown={(e) => {
          if (disabled) return;
          // Clicking on child buttons will stop propagation.
          // If typing is allowed and the click target is the input, let the input handle focus.
          if (allowTyping && e.target === inputRef.current) return;
          setOpen((s) => !s);
          // focus input only when typing is allowed and we're opening
          if (allowTyping && !open) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
      >
        <input
          ref={inputRef}
          className={`nc-input ${isSmall ? 'nc-small' : ''}`}
          placeholder={placeholder}
          onFocus={() => {
            if (!disabled && allowTyping) setOpen(true);
            if (!allowTyping) inputRef.current?.blur();
          }}
          onChange={(e) => allowTyping && setQuery(e.target.value)}
          value={open && allowTyping ? query : (selected?.label || '')}
          readOnly={disabled || !allowTyping}
          style={{
            width: '100%',
            paddingRight: showToggle || showClearButton ? (isSmall ? 32 : 44) : 12,
            caretColor: allowTyping ? undefined : 'transparent',
            cursor: allowTyping ? undefined : 'pointer',
            userSelect: allowTyping ? undefined : 'none',
            color: overlayVisible ? 'transparent' : 'var(--nc-text)',
          }}
        />
        {/* When not editing, overlay the selected label and a weak "(default)" hint */}
        {overlayVisible && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: isSmall ? 8 : 12,
              right: showToggle || showClearButton ? (isSmall ? 12 : 24) : (isSmall ? 8 : 12),
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <span className={`nc-combo-overlay-text ${isSmall ? 'nc-small' : ''}`}>{selected?.label}</span>
            {selected?.default && <span className={`nc-combo-overlay-default ${isSmall ? 'nc-small' : ''}`}>({t('default')})</span>}
          </div>
        )}
        {showClearButton && <ClearButton onClick={handleClear} small={isSmall} />}
        {showToggle && <ToggleButton open={open} onClick={() => setOpen((s) => !s)} small={isSmall} />}
      </div>
      <DropdownMenu isOpen={open} options={filtered} onSelect={handleSelect} selectedValue={value} placement={placement} anchorRef={anchorRef} small={isSmall} />
    </div>
  );
}
