import React, { useEffect, useId, useLayoutEffect, useRef } from 'react';
import { MenuPopup, type MenuBarItem } from './MenuBar';

export interface ContextMenuOption extends Omit<MenuBarItem, 'items'> {
    /** Called when the command is selected. */
    onClick?: () => void;
    /** Nested submenu options. */
    items?: ContextMenuOption[];
}

export interface ContextMenuProps {
    /** Whether the context menu is open. */
    open: boolean;
    /** Called when the menu should close. */
    onClose: () => void;
    /** Menu options to display. */
    options: ContextMenuOption[];
    /** Reference element to anchor the menu. */
    anchorRef?: React.RefObject<HTMLElement>;
    /** Anchor element directly. */
    anchor?: HTMLElement | null;
    /** Preferred opening direction. */
    preferredDirection?: 'down' | 'up';
    /** Viewport coordinates, taking precedence over the anchor. */
    position?: { x: number; y: number };
    /** Reading and keyboard navigation direction. */
    dir?: 'ltr' | 'rtl';
    /** Translated accessible menu name. */
    'aria-label'?: string;
    /** Additional class names applied to the menu and its submenus. */
    className?: string;
}

function adaptOptions(options: ContextMenuOption[]): MenuBarItem[] {
    return options.map(option => ({
        ...option,
        items: option.items ? adaptOptions(option.items) : undefined,
        onSelect: () => { option.onClick?.(); option.onSelect?.(); },
    }));
}

export function ContextMenu({ open, onClose, options, anchorRef, anchor, preferredDirection = 'down', position, dir = 'ltr', 'aria-label': ariaLabel = '', className }: ContextMenuProps) {
    const owner = useId();
    const previousFocus = useRef<HTMLElement | null>(null);
    const anchorElement = anchor || anchorRef?.current;

    useLayoutEffect(() => {
        if (!open) return;
        const focused = document.activeElement;
        if (focused instanceof HTMLElement && !focused.closest('[data-menubar-owner]')) previousFocus.current = focused;
        else previousFocus.current = anchorElement || null;
        const popup = Array.from(document.querySelectorAll<HTMLElement>('[data-menubar-owner]')).find(element => element.dataset.menubarOwner === owner);
        popup?.querySelector<HTMLElement>('[role^="menuitem"]:not([disabled])')?.focus();
    }, [open, anchorElement, owner, position?.x, position?.y]);

    useEffect(() => {
        if (!open) return;
        const dismissOutside = (event: Event) => {
            if (event.composedPath().some(node => node instanceof HTMLElement && node.dataset.menubarOwner === owner)) return;
            if (!position && anchorElement?.contains(event.target as Node)) return;
            onClose();
        };
        document.addEventListener('pointerdown', dismissOutside);
        document.addEventListener('focusin', dismissOutside);
        return () => {
            document.removeEventListener('pointerdown', dismissOutside);
            document.removeEventListener('focusin', dismissOutside);
        };
    }, [open, owner, anchorElement, position, onClose]);

    const restoreFocus = () => {
        onClose();
        (previousFocus.current || anchorElement)?.focus();
    };

    if (!open || (!position && !anchorElement)) return null;

    return <MenuPopup owner={owner} items={adaptOptions(options)} anchor={anchorElement} position={position} focusOnOpen={false}
        preferredDirection={preferredDirection} dir={dir} label={ariaLabel} className={className}
        onClose={restoreFocus} onDismiss={restoreFocus} onSwitch={() => { }} />;
}