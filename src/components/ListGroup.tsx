import React from 'react';

export interface ListGroupItemProps {
  /** Content of the list item */
  children: React.ReactNode;
  /** Click handler for the item */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether to show bottom border (default: true) */
  showBorder?: boolean;
  /** Whether text should be selectable (default: false) */
  selectable?: boolean;
  /** Optional CSS styles to apply to the item */
  style?: React.CSSProperties;
}

/**
 * A single item within a ListGroup.
 * Can contain any content - fully flexible.
 */
export function ListGroupItem({
  children,
  onClick,
  showBorder = true,
  selectable = false,
  style,
}: ListGroupItemProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;

    // If selectable, don't trigger click when user is selecting text
    if (selectable) {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        return;
      }
    }
    onClick(e);
  };

  return (
    <div
      onClick={handleClick}
      onMouseDown={() => onClick && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        userSelect: selectable ? 'text' : undefined,
        borderBottom: showBorder ? undefined : 'none',
        ...style,
      }}
      className={`nc-list-group-item ${onClick ? 'nc-list-group-item-clickable' : ''} ${isPressed ? 'nc-list-group-item-active' : ''}`}
    >
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

export interface ListGroupProps {
  /** Optional group title */
  title?: string;
  /** Optional tools rendered on the title row (e.g., buttons) */
  titleTools?: React.ReactNode;
  /** Group content (ListGroupItem components or any other content) */
  children: React.ReactNode;
  /** Optional CSS styles to apply to the container */
  style?: React.CSSProperties;
}

/**
 * A container for grouping list items with a rounded border.
 * Similar to iOS-style grouped lists or Windows 11 settings groups.
 */
export function ListGroup({ title, titleTools, children, style }: ListGroupProps) {
  return (
    <div className="nc-list-group" style={style}>
      {(title || titleTools) && (
        <div className='nc-list-group-title'>
          <div>{title}</div>
          {titleTools && (
            <div className="nc-list-group-title-tools">
              {titleTools}
            </div>
          )}
        </div>
      )}
      <div
        className="nc-list-group-content"
      >
        {children}
      </div>
    </div>
  );
}
