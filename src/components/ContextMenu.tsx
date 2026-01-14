import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ContextMenuOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'danger';
}

export interface ContextMenuProps {
  /** Whether the context menu is open */
  open: boolean;
  /** Called when the menu should close */
  onClose: () => void;
  /** Menu options to display */
  options: ContextMenuOption[];
  /** Reference element to anchor the menu position, or the element itself */
  anchorRef?: React.RefObject<HTMLElement>;
  /** Anchor element directly (alternative to anchorRef) */
  anchor?: HTMLElement | null;
  /** Preferred direction: 'down' or 'up' (default: 'down') */
  preferredDirection?: 'down' | 'up';
}

/**
 * A context menu component that pops relative to an anchor element.
 * Automatically detects available space and positions itself accordingly.
 * Default position is right-down, but switches to right-up when space is limited.
 */
export function ContextMenu({
  open,
  onClose,
  options,
  anchorRef,
  anchor,
  preferredDirection = 'down',
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Get the anchor element from either ref or prop
  const anchorElement = anchor || anchorRef?.current;

  // Update menu position based on anchor and available space
  useEffect(() => {
    if (!open || !anchorElement || !menuRef.current) return;

    const anchorRect = anchorElement.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate position for down direction (menu below anchor)
    const downTop = anchorRect.bottom + 8; // 8px gap
    const downFits = downTop + menuRect.height <= viewportHeight - 8; // 8px bottom margin

    // Determine final direction
    let finalDirection: 'down' | 'up' = preferredDirection;
    if (!downFits && preferredDirection === 'down') {
      finalDirection = 'up';
    } else if (preferredDirection === 'up' && downFits) {
      // Only override if explicitly set to 'up' but down fits perfectly
      finalDirection = 'up';
    }

    // Calculate final top position
    let finalTop: number;
    if (finalDirection === 'down') {
      finalTop = downTop;
    } else {
      // Menu above anchor
      finalTop = anchorRect.top - menuRect.height - 8;
    }

    // Left position: align menu's left edge with anchor's left edge
    const finalLeft = anchorRect.left;

    setPosition({
      top: Math.max(8, finalTop), // Ensure minimum 8px from top
      left: Math.max(8, finalLeft), // Ensure minimum 8px from left
    });
  }, [open, anchorElement, preferredDirection]);

  // Handle clicking outside to close
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorElement &&
        !anchorElement.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, onClose, anchorElement]);

  if (!open) return null;

  const handleOptionClick = (option: ContextMenuOption) => {
    if (!option.disabled) {
      option.onClick();
      onClose();
    }
  };

  return createPortal(
    <div
      ref={menuRef}
      className="nc-context-menu"
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 10000,
      }}
      role="menu"
    >
      {options.map((option) => (
        <button
          key={option.id}
          className={`nc-context-menu-item ${option.variant === 'danger' ? 'nc-danger' : ''} ${option.disabled ? 'nc-disabled' : ''}`}
          onClick={() => handleOptionClick(option)}
          disabled={option.disabled}
          role="menuitem"
        >
          {option.icon && <span className="nc-context-menu-icon">{option.icon}</span>}
          <span className="nc-context-menu-label">{option.label}</span>
        </button>
      ))}
    </div>,
    document.body
  );
}
