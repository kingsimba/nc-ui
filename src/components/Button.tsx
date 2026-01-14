import React from 'react';
import { ActivityIndicator } from './ActivityIndicator';

export type ButtonVariant = 'default' | 'primary' | 'danger' | 'warning' | 'success' | 'ghost';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  block?: boolean;
  size?: 'default' | 'small' | 'large';
  textSelectable?: boolean;
  loading?: boolean;
};

export function Button({ variant = 'default', block, size = 'default', className, disabled, textSelectable, loading, onClick, children, ...rest }: ButtonProps) {
  const cls = [
    'nc-button',
    variant !== 'default' ? `nc-${variant}` : '',
    block ? 'nc-block' : '',
    size === 'small' ? 'nc-small' : '',
    size === 'large' ? 'nc-large' : '',
    (disabled || loading) ? 'nc-disabled' : '',
    textSelectable ? 'nc-text-selectable' : '',
    loading ? 'nc-loading' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    // If text is selected, don't trigger click
    if (textSelectable) {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        return;
      }
    }
    onClick?.(e);
  };

  return (
    <button
      className={cls}
      disabled={disabled || loading}
      onClick={handleClick}
      {...rest}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          className="nc-button-spinner"
          color={variant !== 'default' && variant !== 'ghost' ? 'white' : undefined}
        />
      )}
      {children}
    </button>
  );
}
