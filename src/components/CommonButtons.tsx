import React from 'react';
import { RefreshIcon, EditIcon, DeleteIcon } from './icons/GeneratedIcons';
import { CloseIcon } from './icons/CloseIcon';

interface RefreshButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: 'small' | 'default' | 'large';
  title?: string;
  'aria-label'?: string;
}

interface CloseButtonProps {
  onClick: () => void;
  disabled?: boolean;
  size?: 'small' | 'default' | 'large';
  title?: string;
  'aria-label'?: string;
}

interface EditButtonProps {
  onClick: () => void;
  disabled?: boolean;
  size?: 'small' | 'default' | 'large';
  title?: string;
  'aria-label'?: string;
}

interface TrashButtonProps {
  onClick: () => void;
  disabled?: boolean;
  size?: 'small' | 'default' | 'large';
  title?: string;
  'aria-label'?: string;
}

/**
 * A reusable refresh button with spinning animation.
 * Shows a spinning refresh icon when loading.
 */
export function RefreshButton({ onClick, loading = false, disabled = false, size = 'default', title, 'aria-label': ariaLabel }: RefreshButtonProps) {
  const iconSize = size === 'small' ? 14 : size === 'large' ? 20 : 18;
  const defaultTitle = loading ? 'Refreshing...' : 'Refresh';
  const defaultAriaLabel = loading ? 'Refreshing' : 'Refresh';

  return (
    <button
      className="nc-icon-button"
      onClick={onClick}
      disabled={disabled || loading}
      title={title ?? defaultTitle}
      aria-label={ariaLabel ?? defaultAriaLabel}
      data-size={size}
    >
      <RefreshIcon size={iconSize} className={loading ? 'nc-spinning' : ''} />
    </button>
  );
}

/**
 * A reusable close button.
 */
export function CloseButton({ onClick, disabled = false, size = 'default', title = 'Close', 'aria-label': ariaLabel = 'Close' }: CloseButtonProps) {
  const iconSize = size === 'small' ? 14 : size === 'large' ? 20 : 18;

  return (
    <button
      className="nc-icon-button nc-icon-button-close"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      data-size={size}
    >
      <CloseIcon size={iconSize} />
    </button>
  );
}

/**
 * A reusable edit button.
 */
export function EditButton({ onClick, disabled = false, size = 'default', title = 'Edit', 'aria-label': ariaLabel = 'Edit' }: EditButtonProps) {
  const iconSize = size === 'small' ? 14 : size === 'large' ? 20 : 18;

  return (
    <button
      className="nc-icon-button nc-icon-button-edit"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      data-size={size}
    >
      <EditIcon size={iconSize} />
    </button>
  );
}

/**
 * A reusable trash button.
 */
export function TrashButton({ onClick, disabled = false, size = 'default', title = 'Delete', 'aria-label': ariaLabel = 'Delete' }: TrashButtonProps) {
  const iconSize = size === 'small' ? 14 : size === 'large' ? 20 : 18;

  return (
    <button
      className="nc-icon-button nc-icon-button-trash"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      data-size={size}
    >
      <DeleteIcon size={iconSize} />
    </button>
  );
}

interface HyperlinkProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
  'aria-label'?: string;
  size?: 'small' | 'default';
}

/**
 * A reusable hyperlink component styled as text with primary color.
 * Useful for text-based actions that look like links.
 */
export function Hyperlink({ onClick, disabled = false, children, title, 'aria-label': ariaLabel, size = 'default' }: HyperlinkProps) {
  return (
    <button
      className="nc-hyperlink"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      data-size={size}
    >
      {children}
    </button>
  );
}
