import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from './icons';

// ChevronUpIcon - defined inline since it's not in GeneratedIcons
const ChevronUpIcon = ({ size = 24, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

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
