import React from 'react';

export interface TabsProps {
  /** Array of tab labels */
  tabs: string[];
  /** Currently active tab label */
  active: string;
  /** Callback when a tab is selected */
  onChange: (tab: string) => void;
  /** Additional CSS class name for the container */
  className?: string;
  /** Optional toolbar content rendered at the end of the tab bar */
  toolbar?: React.ReactNode;
  /** Whether tabs should wrap to multiple lines */
  multiline?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function Tabs({ tabs, active, onChange, className, toolbar, multiline, style }: TabsProps) {
  return (
    <div className={className ? className : 'nc-tab-container'} style={{ display: 'flex', justifyContent: 'space-between', alignItems: multiline ? 'flex-start' : 'center', overflow: 'hidden', ...style }}>
      <div style={{ display: 'flex', flex: '1', alignItems: 'center', minWidth: 0, overflow: 'hidden', flexWrap: multiline ? 'wrap' : 'nowrap' }}>
        {tabs.map((t) => (
          <div
            key={t}
            className={`nc-tab-item ${active === t ? 'nc-active' : ''}`}
            onClick={() => onChange(t)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onChange(t); }}
            style={{ flexShrink: multiline ? 1 : 0 }}
          >
            {t.toUpperCase()}
          </div>
        ))}
        <div style={{ flexGrow: 1 }}></div>
        {toolbar && (
          <div style={{ display: 'flex', gap: '8px', height: "100%", alignItems: 'center' }}>
            {toolbar}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
