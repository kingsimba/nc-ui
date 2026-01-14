import { useEffect, useMemo, useRef, useState } from 'react';

type Option = { label: string; value: string };

export interface MultiSelectProps {
  /** Array of currently selected values */
  values: string[];
  /** Callback when selection changes */
  onChange: (values: string[]) => void;
  /** Available options to select from */
  options: Option[];
  /** Placeholder text when no items are selected */
  placeholder?: string;
  /** Label text displayed above the select */
  label?: string;
}

export function MultiSelect({ values, onChange, options, placeholder = 'Select…', label }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);
  const filtered = useMemo(() => options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())), [options, query]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!(e.target instanceof Node) || !ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const toggle = (v: string) => {
    if (values.includes(v)) onChange(values.filter((x) => x !== v));
    else onChange([...values, v]);
  };

  return (
    <div ref={ref} className="nc-col" style={{ position: 'relative' }}>
      {label && <span className="nc-label">{label}</span>}
      <div className="nc-row" style={{ flexWrap: 'wrap', gap: 6, minHeight: 42, alignItems: 'center', border: '1px solid var(--nc-button-border)', borderRadius: 8, background: 'var(--nc-button-bg)', padding: '4px 8px' }}>
        {values.length === 0 && <span className="nc-label">{placeholder}</span>}
        {values.map((v) => {
          const o = options.find((o) => o.value === v);
          if (!o) return null;
          return (
            <span key={v} style={{ padding: '4px 8px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--nc-button-bg)', border: '1px solid var(--nc-button-border)' }}>
              {o.label}
              <button
                className="nc-button nc-ghost"
                style={{ padding: 0, minHeight: 0, height: 20, width: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
                onClick={() => toggle(v)}
                aria-label={`Remove ${o.label}`}
              >
                ✕
              </button>
            </span>
          );
        })}
        <input
          className="nc-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          style={{ minWidth: 50, border: 'none', background: 'transparent', padding: 4, minHeight: 32, flex: 1 }}
        />
      </div>
      {open && (
        <div className="nc-combo-dropdown" style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, marginTop: 4, boxShadow: '0 4px 12px var(--nc-shadow)' }}>
          {filtered.map((o) => {
            const selected = values.includes(o.value);
            return (
              <div key={o.value} className="nc-section nc-row" style={{ justifyContent: 'space-between', cursor: 'pointer', padding: 12 }} onMouseDown={() => toggle(o.value)}>
                <span>{o.label}</span>
                <span>{selected ? '✔️' : ''}</span>
              </div>
            );
          })}
          {filtered.length === 0 && <div className="nc-section nc-label">No results</div>}
        </div>
      )}
    </div>
  );
}
