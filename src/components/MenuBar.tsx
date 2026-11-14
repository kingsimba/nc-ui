import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface MenuBarItem {
    /** Stable identifier, unique within this menu. */
    id: string;
    /** Translated label supplied by the application. */
    label?: string;
    /** Optional decorative icon. */
    icon?: React.ReactNode;
    /** Display-only shortcut; the application registers the actual command. */
    shortcut?: string;
    /** Prevent selection. */
    disabled?: boolean;
    /** Render a command, separator, section label, checkbox, or radio item. */
    type?: 'item' | 'separator' | 'label' | 'checkbox' | 'radio';
    /** Controlled selection state for checkbox and radio items. */
    checked?: boolean;
    /** Called when a checkable item is selected. */
    onCheckedChange?: (checked: boolean) => void;
    /** Called when a command is selected. */
    onSelect?: () => void;
    /** Nested submenu commands. */
    items?: MenuBarItem[];
}

export interface MenuBarMenu {
    /** Stable menu identifier, independent of its translation. */
    id: string;
    /** Translated menu title. */
    label: string;
    /** Optional decorative icon. */
    icon?: React.ReactNode;
    /** Disable the entire menu. */
    disabled?: boolean;
    /** Commands in this menu. */
    items: MenuBarItem[];
}

export interface MenuBarProps {
    /** Top-level menus. Labels may be updated when the locale changes. */
    menus: MenuBarMenu[];
    /** Accessible name, translated by the application. */
    'aria-label'?: string;
    /** Reading direction, including submenu and keyboard direction. */
    dir?: 'ltr' | 'rtl';
    /** Additional root class names. */
    className?: string;
    /** Optional root layout styles. */
    style?: React.CSSProperties;
}

interface MenuPopupProps {
    owner: string;
    items: MenuBarItem[];
    anchor: HTMLElement;
    submenu?: boolean;
    focusOnOpen?: boolean;
    dir: 'ltr' | 'rtl';
    label: string;
    onClose: () => void;
    onDismiss: () => void;
    onSwitch: (offset: number) => void;
}

function MenuPopup({ owner, items, anchor, submenu = false, focusOnOpen = true, dir, label, onClose, onDismiss, onSwitch }: MenuPopupProps) {
    const popupRef = useRef<HTMLDivElement>(null);
    const [child, setChild] = useState<{ item: MenuBarItem; anchor: HTMLElement; focusOnOpen: boolean } | null>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const searchRef = useRef({ text: '', time: 0 });

    useLayoutEffect(() => {
        const popup = popupRef.current;
        if (!popup) return;
        const updatePosition = () => {
            const bounds = anchor.getBoundingClientRect();
            const size = popup.getBoundingClientRect();
            let left = submenu ? (dir === 'rtl' ? bounds.left - size.width : bounds.right) :
                (dir === 'rtl' ? bounds.right - size.width : bounds.left);
            if (submenu && left + size.width > window.innerWidth - 8) left = bounds.left - size.width;
            if (submenu && left < 8) left = bounds.right;
            let top = submenu ? bounds.top : bounds.bottom + 4;
            if (!submenu && top + size.height > window.innerHeight - 8) top = bounds.top - size.height - 4;
            setPosition({ left: Math.max(8, Math.min(left, window.innerWidth - size.width - 8)), top: Math.max(8, Math.min(top, window.innerHeight - size.height - 8)) });
        };
        updatePosition();
        if (focusOnOpen) popup.querySelector<HTMLElement>('[role^="menuitem"]:not([disabled])')?.focus();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [anchor, dir, submenu, focusOnOpen]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        event.stopPropagation();
        const buttons = Array.from(popupRef.current?.querySelectorAll<HTMLButtonElement>('[role^="menuitem"]:not([disabled])') || []);
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
        const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            setChild(null);
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 :
                (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
            buttons[next]?.focus();
        } else if (event.key === 'Escape' || (submenu && event.key === backward)) {
            event.preventDefault();
            onClose();
            anchor.focus();
        } else if (event.key === forward) {
            event.preventDefault();
            if (buttons[index]?.getAttribute('aria-haspopup')) buttons[index].click();
            else if (!submenu) onSwitch(1);
        } else if (event.key === backward && !submenu) {
            event.preventDefault();
            onSwitch(-1);
        } else if (event.key === 'Tab') {
            onDismiss();
        } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== ' ') {
            const now = performance.now();
            const previous = now - searchRef.current.time < 700 ? searchRef.current.text : '';
            const text = previous + event.key.toLocaleLowerCase();
            searchRef.current = { text, time: now };
            const ordered = [...buttons.slice(index + 1), ...buttons.slice(0, index + 1)];
            ordered.find(button => button.dataset.label?.toLocaleLowerCase().startsWith(text))?.focus();
        }
    };

    return createPortal(
        <div ref={popupRef} role="menu" aria-label={label} dir={dir} data-menubar-owner={owner} className="nc-menubar-popup" style={position} onKeyDown={handleKeyDown}>
            {items.map(item => {
                if (item.type === 'separator') return <div key={item.id} role="separator" className="nc-menubar-separator" />;
                if (item.type === 'label') return <div key={item.id} className="nc-menubar-label">{item.label}</div>;
                const checkable = item.type === 'checkbox' || item.type === 'radio';
                return <button key={item.id} type="button" role={checkable ? `menuitem${item.type}` : 'menuitem'}
                    aria-checked={checkable ? !!item.checked : undefined} aria-haspopup={item.items ? 'menu' : undefined}
                    aria-expanded={item.items ? child?.item.id === item.id : undefined} disabled={item.disabled}
                    tabIndex={-1} data-label={item.label} className="nc-menubar-item"
                    onPointerEnter={event => {
                        if (item.disabled) return;
                        event.currentTarget.focus();
                        setChild(item.items ? { item, anchor: event.currentTarget, focusOnOpen: false } : null);
                    }}
                    onClick={event => {
                        if (item.items) { setChild({ item, anchor: event.currentTarget, focusOnOpen: event.detail === 0 }); return; }
                        onDismiss();
                        item.onCheckedChange?.(item.type === 'radio' ? true : !item.checked);
                        item.onSelect?.();
                    }}>
                    <span className="nc-menubar-icon" aria-hidden="true">{checkable ? (item.checked ? (item.type === 'radio' ? '\u2022' : '\u2713') : null) : item.icon}</span>
                    <span className="nc-menubar-text">{item.label}</span>
                    {item.shortcut && <span className="nc-menubar-shortcut" aria-hidden="true">{item.shortcut}</span>}
                    {item.items && <span aria-hidden="true">{dir === 'rtl' ? '\u2039' : '\u203a'}</span>}
                </button>;
            })}
            {child?.item.items && <MenuPopup key={child.item.id} owner={owner} items={child.item.items} anchor={child.anchor} submenu focusOnOpen={child.focusOnOpen} dir={dir} label={child.item.label || ''} onClose={() => setChild(null)} onDismiss={onDismiss} onSwitch={onSwitch} />}
        </div>, document.body
    );
}

export function MenuBar({ menus, dir = 'ltr', className = '', style, 'aria-label': ariaLabel }: MenuBarProps) {
    const owner = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<string | null>(null);
    const [focused, setFocused] = useState<string | null>(null);
    const enabled = menus.filter(menu => !menu.disabled);
    const current = menus.find(menu => menu.id === active && !menu.disabled);
    const anchor = rootRef.current?.querySelector<HTMLButtonElement>(`[data-menu-index="${menus.indexOf(current!)}"]`);

    useEffect(() => {
        if (!active) return;
        const dismiss = (event: Event) => {
            const target = event.target as Node;
            if (rootRef.current?.contains(target) || anchor?.contains(target)) return;
            if (event.composedPath().some(node => node instanceof HTMLElement && node.dataset.menubarOwner === owner)) return;
            setActive(null);
        };
        const handlePointer = (event: PointerEvent) => {
            dismiss(event);
        };
        const handleFocus = (event: FocusEvent) => {
            dismiss(event);
        };
        document.addEventListener('pointerdown', handlePointer);
        document.addEventListener('focusin', handleFocus);
        return () => {
            document.removeEventListener('pointerdown', handlePointer);
            document.removeEventListener('focusin', handleFocus);
        };
    }, [active, anchor, owner]);

    const switchMenu = (offset: number, from = active) => {
        const index = enabled.findIndex(menu => menu.id === from);
        const next = enabled[(index + offset + enabled.length) % enabled.length];
        if (!next) return;
        setFocused(next.id);
        if (active) setActive(next.id);
        rootRef.current?.querySelector<HTMLButtonElement>(`[data-menu-index="${menus.indexOf(next)}"]`)?.focus();
    };

    return <div ref={rootRef} role="menubar" aria-label={ariaLabel} dir={dir} className={`nc-menubar ${className}`} style={style}>
        {menus.map((menu, index) => <button key={menu.id} type="button" role="menuitem" aria-haspopup="menu" aria-expanded={current?.id === menu.id}
            disabled={menu.disabled} data-menu-index={index} tabIndex={(focused && enabled.some(item => item.id === focused) ? focused === menu.id : enabled[0]?.id === menu.id) ? 0 : -1}
            className="nc-menubar-trigger" onFocus={() => setFocused(menu.id)}
            onClick={() => setActive(active === menu.id ? null : menu.id)}
            onPointerEnter={() => { if (active && !menu.disabled) setActive(menu.id); }}
            onKeyDown={event => {
                if (['ArrowDown', 'Enter', ' '].includes(event.key)) { event.preventDefault(); setActive(menu.id); }
                else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                    event.preventDefault(); switchMenu((event.key === 'ArrowRight') === (dir === 'ltr') ? 1 : -1, menu.id);
                } else if (event.key === 'Escape') setActive(null);
            }}>
            {menu.icon && <span className="nc-menubar-icon" aria-hidden="true">{menu.icon}</span>}{menu.label}
        </button>)}
        {current && anchor && <MenuPopup key={current.id} owner={owner} items={current.items} anchor={anchor} dir={dir} label={current.label} onClose={() => setActive(null)} onDismiss={() => { setActive(null); anchor.focus(); }} onSwitch={offset => switchMenu(offset)} />}
    </div>;
}