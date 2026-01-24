import React, { useRef, useState, useEffect, Children, isValidElement, ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from './icons';

// ChevronUpIcon - defined inline since it's not in GeneratedIcons
const ChevronUpIcon = ({ size = 24, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export interface TabPanelProps {
  /** The tab label this panel corresponds to */
  tab: string;
  /** Panel content */
  children: ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Individual tab panel - use as children of TabPanels
 */
export function TabPanel({ children, className = '', style }: TabPanelProps) {
  return (
    <div className={`nc-tab-panel ${className}`} style={style}>
      {children}
    </div>
  );
}

export interface TabPanelsProps {
  /** Currently active tab label */
  active: string;
  /** Tab panel children (TabPanel components) */
  children: ReactNode;
  /** 
   * When true, all panels remain mounted and are hidden via CSS.
   * Use this when you need to preserve state (e.g., form inputs) across tab switches.
   * When false (default), only the active panel is mounted.
   */
  keepMounted?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Container for tab panels - renders content based on active tab.
 * Use with TabPanel children to define content for each tab.
 * 
 * @example
 * // Unmount inactive panels (default - better performance)
 * <TabPanels active={activeTab}>
 *   <TabPanel tab="Tab1">Content 1</TabPanel>
 *   <TabPanel tab="Tab2">Content 2</TabPanel>
 * </TabPanels>
 * 
 * @example
 * // Keep all panels mounted (preserves form state)
 * <TabPanels active={activeTab} keepMounted>
 *   <TabPanel tab="Tab1"><input type="text" /></TabPanel>
 *   <TabPanel tab="Tab2"><input type="text" /></TabPanel>
 * </TabPanels>
 */
export function TabPanels({ active, children, keepMounted = false, className = '', style }: TabPanelsProps) {
  const panels = Children.toArray(children).filter(
    (child): child is React.ReactElement<TabPanelProps> =>
      isValidElement(child) && (child.type === TabPanel || (child.type as any).displayName === 'TabPanel')
  );

  if (keepMounted) {
    // Render all panels, hide inactive ones with CSS
    return (
      <div className={`nc-tab-panels ${className}`} style={style}>
        {panels.map((panel) => {
          const isActive = panel.props.tab === active;
          return (
            <div
              key={panel.props.tab}
              className={`nc-tab-panel-wrapper ${isActive ? 'nc-active' : ''}`}
              style={{ display: isActive ? 'block' : 'none' }}
              aria-hidden={!isActive}
            >
              {panel}
            </div>
          );
        })}
      </div>
    );
  }

  // Default: only render the active panel
  const activePanel = panels.find((panel) => panel.props.tab === active);
  return (
    <div className={`nc-tab-panels ${className}`} style={style}>
      {activePanel}
    </div>
  );
}

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
  /** Tab orientation: horizontal (default), verticalLeft, or verticalRight */
  orientation?: 'horizontal' | 'verticalLeft' | 'verticalRight';
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export function Tabs({ tabs, active, onChange, className, toolbar, multiline, orientation = 'horizontal', style }: TabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);
  const isVertical = orientation === 'verticalLeft' || orientation === 'verticalRight';

  // Mouse drag scrolling state
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const scrollStartPos = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        if (isVertical) {
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
  }, [tabs, isVertical]);

  // Mouse drag scrolling handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startPos.current = isVertical ? e.clientY : e.clientX;
    scrollStartPos.current = isVertical ? scrollRef.current.scrollTop : scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const currentPos = isVertical ? e.clientY : e.clientX;
    const diff = startPos.current - currentPos;
    if (Math.abs(diff) > 3) hasDragged.current = true;
    if (isVertical) {
      scrollRef.current.scrollTop = scrollStartPos.current + diff;
    } else {
      scrollRef.current.scrollLeft = scrollStartPos.current + diff;
    }
  };

  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.cursor = '';
    scrollRef.current.style.userSelect = '';
  };

  const handleMouseLeave = () => {
    handleMouseUp();
  };

  // Convert vertical wheel to horizontal scroll in horizontal mode
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isVertical) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 0.3;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [isVertical]);

  const handleTabClick = (tab: string) => {
    // Ignore click if user was dragging
    if (hasDragged.current) return;
    onChange(tab);
  };

  return (
    <div className={`nc-tab-container ${isVertical ? `nc-vertical nc-${orientation}` : ''} ${className || ''}`} style={style}>
      <div className="nc-tab-scroll-wrapper">
        {canScrollStart && (
          <div className={`nc-tab-scroll-indicator ${isVertical ? 'nc-top' : 'nc-left'}`}>
            {isVertical ? <ChevronUpIcon size={16} /> : <ChevronLeftIcon size={16} />}
          </div>
        )}
        <div
          ref={scrollRef}
          className={`nc-tab-scroll ${multiline ? 'nc-multiline' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'grab' }}
        >
          {tabs.map((t) => (
            <div
              key={t}
              className={`nc-tab-item ${active === t ? 'nc-active' : ''}`}
              onClick={() => handleTabClick(t)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onChange(t); }}
            >
              {isVertical ? t : t.toUpperCase()}
            </div>
          ))}
        </div>
        {canScrollEnd && (
          <div className={`nc-tab-scroll-indicator ${isVertical ? 'nc-bottom' : 'nc-right'}`}>
            {isVertical ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
          </div>
        )}
      </div>
      {toolbar && (
        <div className="nc-tab-toolbar">
          {toolbar}
        </div>
      )}
    </div>
  );
}

export default Tabs;
