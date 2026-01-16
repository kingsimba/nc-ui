import React, { useRef, useState, useEffect } from 'react';

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
  /** Whether tabs should be displayed vertically */
  vertical?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function Tabs({ tabs, active, onChange, className, toolbar, multiline, vertical, style }: TabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        if (vertical) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          setCanScrollStart(scrollTop > 1);
          setCanScrollEnd(scrollTop < scrollHeight - clientHeight - 1);
        } else {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          setCanScrollStart(scrollLeft > 1);
          setCanScrollEnd(scrollLeft < scrollWidth - clientWidth - 1);
        }
      }
    };

    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [tabs, vertical]);

  return (
    <div className={`nc-tab-container ${vertical ? 'nc-vertical' : ''} ${className || ''}`} style={style}>
      {canScrollStart && <div className={`nc-tab-scroll-indicator ${vertical ? 'nc-top' : 'nc-left'}`} />}
      <div
        ref={scrollRef}
        className={`nc-tab-scroll ${multiline ? 'nc-multiline' : ''}`}
      >
        {tabs.map((t) => (
          <div
            key={t}
            className={`nc-tab-item ${active === t ? 'nc-active' : ''}`}
            onClick={() => onChange(t)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onChange(t); }}
          >
            {vertical ? t : t.toUpperCase()}
          </div>
        ))}
        {toolbar && (
          <div className="nc-tab-toolbar">
            {toolbar}
          </div>
        )}
      </div>
      {canScrollEnd && <div className={`nc-tab-scroll-indicator ${vertical ? 'nc-bottom' : 'nc-right'}`} />}
    </div>
  );
}

export default Tabs;
