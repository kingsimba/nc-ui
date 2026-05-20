import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

export type ComboBoxOption = { label: string; value: string; default?: boolean };

export interface ComboBoxProps {
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string | undefined) => void;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Available options for static lists */
  options?: ComboBoxOption[];
  /** Async function to fetch options based on typed query. Enables server-side search (implies allowTyping). */
  candidates?: (query: string) => Promise<ComboBoxOption[]>;
  /** Custom render for each option in the dropdown. Receives the option, index, and whether it is highlighted. */
  renderOption?: (option: ComboBoxOption, index: number, highlighted: boolean) => React.ReactNode;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Whether the selection can be cleared */
  clearable?: boolean;
  /** Whether typing to filter is allowed (ignored when candidates is provided) */
  allowTyping?: boolean;
  /** Dropdown placement preference */
  placement?: 'top' | 'bottom';
  /** Size variant */
  size?: 'default' | 'small';
  /** Visual appearance of the closed control */
  appearance?: 'default' | 'transparent' | 'plain';
  /** Horizontal alignment for the selected text and typed query */
  textAlign?: 'left' | 'center' | 'right';
  /** Custom styles */
  style?: React.CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

function DropdownOption({ option, onChange, selected, highlighted, small, renderOption, index }: { option: ComboBoxOption; onChange: (value: string, label: string) => void; selected?: boolean; highlighted?: boolean; small?: boolean; renderOption?: (option: ComboBoxOption, index: number, highlighted: boolean) => React.ReactNode; index: number }) {
  const optionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Scroll into view when highlighted
  useEffect(() => {
    if (highlighted && optionRef.current) {
      optionRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [highlighted]);

  return (
    <div
      ref={optionRef}
      className={`nc-combo-dropdown-option ${small ? 'nc-small' : ''} ${highlighted ? 'nc-highlighted' : ''}`}
      role="option"
      onClick={() => onChange(option.value, option.label)}
      aria-selected={selected}
      style={{
        cursor: 'pointer',
        background: highlighted ? 'rgba(59,130,246,0.18)' : selected ? 'rgba(59,130,246,0.12)' : undefined,
      }}
    >
      {renderOption ? renderOption(option, index, !!highlighted) : (
        <>
          {option.label}
          {option.default && (
            <span style={{ fontSize: '0.85em', color: 'var(--nc-text-weak)', marginLeft: 6 }}>
              ({t('common.default')})
            </span>
          )}
        </>
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
  highlightedIndex = -1,
  renderOption,
}: {
  isOpen: boolean;
  options: ComboBoxOption[];
  onSelect: (value: string, label: string) => void;
  selectedValue?: string;
  placement?: 'top' | 'bottom';
  anchorRef: React.RefObject<HTMLDivElement>;
  small?: boolean;
  highlightedIndex?: number;
  renderOption?: (option: ComboBoxOption, index: number, highlighted: boolean) => React.ReactNode;
}) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [autoPlacement, setAutoPlacement] = useState<'top' | 'bottom'>(placement);
  const { t } = useTranslation();

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
      onMouseDown={(e) => e.stopPropagation()}
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
        <div className={`nc-combo-dropdown-option nc-no-results ${small ? 'nc-small' : ''}`}>{t('common.noResults')}</div>
      ) : (
        options.map((o, idx) => (
          <DropdownOption key={o.value} option={o} onChange={onSelect} selected={o.value === selectedValue} highlighted={idx === highlightedIndex} small={small} renderOption={renderOption} index={idx} />
        ))
      )}
    </div>
  );

  return createPortal(dropdown, document.body);
}

function ClearButton({ onClick, small }: { onClick: () => void; small?: boolean }) {
  return (
    <span
      role="button"
      tabIndex={0}
      className={`nc-combo-button nc-combo-clear ${small ? 'nc-small' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }
      }}
      aria-label="Clear selection"
    >
      ✕
    </span>
  );
}

function ToggleButton({ open, small }: { open: boolean; small?: boolean }) {
  return (
    <span
      aria-hidden
      className={`nc-combo-button nc-combo-toggle ${small ? 'nc-small' : ''} ${open ? 'nc-open' : ''}`}
    >
      ▾
    </span>
  );
}

export function ComboBox({
  value,
  onChange,
  placeholder = 'Select…',
  options,
  candidates,
  renderOption,
  disabled,
  label,
  clearable = true,
  allowTyping = false,
  placement = 'bottom',
  size = 'default',
  appearance = 'default',
  textAlign = 'left',
  style,
  className,
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSmall = size === 'small';
  const { t } = useTranslation();

  const hasCandidates = !!candidates;
  const canType = allowTyping || hasCandidates;

  const [asyncOptions, setAsyncOptions] = useState<ComboBoxOption[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>(() => {
    // Initialize from static options
    if (options && value) {
      const match = options.find((o) => o.value === value);
      return match ? match.label : '';
    }
    // In candidates mode, use the value itself as the label (server will provide label later)
    if (candidates && value) {
      return value;
    }
    return '';
  });

  // Sync selectedLabel when value changes externally
  useEffect(() => {
    if (!value) {
      setSelectedLabel('');
      return;
    }
    if (options) {
      const match = options.find((o) => o.value === value);
      if (match) setSelectedLabel(match.label);
    } else if (candidates) {
      // In candidates mode, use the value as the display label until server provides it
      setSelectedLabel(value);
    }
  }, [value, options, candidates]);

  // Async debounced search when candidates is provided
  const triggerAsyncSearch = (q: string, immediate = false) => {
    if (!candidates) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const doFetch = async () => {
      try {
        const items = await candidates(q);
        setAsyncOptions(items);
        setHighlightedIndex(-1);
      } catch {
        setAsyncOptions([]);
      }
    };
    if (immediate) {
      doFetch();
    } else {
      debounceRef.current = setTimeout(doFetch, 200);
    }
  };

  const filtered = useMemo(() => {
    if (hasCandidates) return asyncOptions;
    const q = query.toLowerCase();
    if (!canType) return options || [];
    return (options || []).filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, canType, hasCandidates, asyncOptions]);

  // Reset highlighted index when dropdown opens or filtered options change
  useEffect(() => {
    if (open) {
      setHighlightedIndex(-1);
    }
  }, [open, filtered]);

  // Auto-select first option if not clearable and no value is set
  useEffect(() => {
    if (!clearable && !value && options && options.length > 0 && onChange) {
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

  const selected = options
    ? options.find((o) => o.value === value)
    : value
      ? { label: selectedLabel, value }
      : undefined;
  const showClearButton = selected && clearable;
  const showToggle = !disabled && !showClearButton;
  const alignmentClass = `nc-align-${textAlign}`;

  const overlayVisible = !(open && canType) && !!selected;

  const handleSelect = (newValue: string, newLabel: string, fromKeyboard = false) => {
    setSelectedLabel(newLabel);
    onChange?.(newValue);
    setOpen(false);
    setQuery('');
    // Blur input when selecting with keyboard to ensure consistent state
    if (fromKeyboard) {
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onChange?.(undefined);
    setQuery('');
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev + 1;
          return next >= filtered.length ? 0 : next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? filtered.length - 1 : next;
        });
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
          handleSelect(filtered[highlightedIndex].value, filtered[highlightedIndex].label, true);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        setQuery('');
        break;
    }
  };

  return (
    <div className={`nc-combo-container ${appearance === 'transparent' ? 'nc-transparent' : ''} ${appearance === 'plain' ? 'nc-plain' : ''} ${open ? 'nc-open' : ''} ${alignmentClass} ${className || ''}`.trim()} style={{ position: 'relative', ...style }}>
      {label && <span className={`nc-label ${isSmall ? 'nc-small' : ''}`}>{label}</span>}
      <div
        ref={anchorRef}
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        onMouseDown={(e) => {
          if (disabled) return;
          // Clicking on child buttons will stop propagation.
          // If typing is allowed and the click target is the input, let the input handle focus.
          if (canType && e.target === inputRef.current) return;
          setOpen((s) => {
            // When opening with allowTyping, initialize query with selected label
            if (!s && canType && selected) {
              setQuery(selected.label);
            }
            return !s;
          });
          // Fetch all candidates on open when no query yet
          if (hasCandidates && !query) {
            setTimeout(() => triggerAsyncSearch('', true), 0);
          }
          // focus input only when typing is allowed and we're opening
          if (canType && !open) {
            setTimeout(() => {
              inputRef.current?.focus();
              // Select all text so user can easily replace it
              inputRef.current?.select();
            }, 0);
          }
        }}
      >
        <input
          ref={inputRef}
          className={`nc-input ${isSmall ? 'nc-small' : ''}`}
          placeholder={placeholder}
          onFocus={() => {
            if (!disabled && canType) {
              setOpen(true);
              // Initialize query with selected label when focusing
              if (selected) {
                setQuery(selected.label);
                setTimeout(() => inputRef.current?.select(), 0);
              }
              // Fetch all candidates on open when no query yet
              if (hasCandidates && !query) triggerAsyncSearch('', true);
            }
          }}
          onChange={(e) => {
            const val = e.target.value;
            if (canType) {
              setQuery(val);
              if (hasCandidates) triggerAsyncSearch(val);
            }
          }}
          onKeyDown={handleKeyDown}
          value={(open && canType) ? query : (selected?.label || '')}
          readOnly={disabled || !canType}
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
            className={`nc-combo-overlay ${alignmentClass}`}
            style={{
              position: 'absolute',
              left: isSmall ? 8 : 12,
              right: showToggle || showClearButton ? (isSmall ? 12 : 24) : (isSmall ? 8 : 12),
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            <span className={`nc-combo-overlay-text ${isSmall ? 'nc-small' : ''}`}>{selected?.label}</span>
            {selected?.default && <span className={`nc-combo-overlay-default ${isSmall ? 'nc-small' : ''}`}>({t('common.default')})</span>}
          </div>
        )}
        {showClearButton && <ClearButton onClick={handleClear} small={isSmall} />}
        {showToggle && <ToggleButton open={open} small={isSmall} />}
      </div>
      <DropdownMenu isOpen={open} options={filtered} onSelect={handleSelect} selectedValue={value} placement={placement} anchorRef={anchorRef} small={isSmall} highlightedIndex={highlightedIndex} renderOption={renderOption} />
    </div>
  );
}
