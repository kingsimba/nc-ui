/**
 * Escape ownership between nested popups.
 *
 * Popups push a layer while they are open. A single document-level listener consumes Escape for
 * the most recently pushed (top-most) layer and stops the event, so host applications' global
 * Escape shortcuts do not fire as well.
 */

interface EscapeLayer {
  /** The popup's own dismiss action, called when it is the top-most layer. */
  onEscape: () => void;
}

let layers: EscapeLayer[] = [];

function onKeyDown(e: KeyboardEvent) {
  if (e.key !== 'Escape') return;
  // A widget that owns Escape while focused (ComboBox dropdown, plain-mode Input) consumes the
  // press with preventDefault from its React handler, which runs before this listener. Only the
  // next press reaches the layer below it.
  if (e.defaultPrevented) return;
  const top = layers[layers.length - 1];
  if (!top) return;
  e.preventDefault();
  e.stopPropagation();
  top.onEscape();
}

// Attached only while at least one layer exists, so the module stays SSR-safe and no global
// listener is left behind.
function startListening() {
  document.addEventListener('keydown', onKeyDown);
}

function stopListening() {
  document.removeEventListener('keydown', onKeyDown);
}

/** Register an escape layer. Returns a function that unregisters it. */
export function pushEscapeLayer(onEscape: () => void): () => void {
  const layer: EscapeLayer = { onEscape };
  if (layers.length === 0) startListening();
  layers.push(layer);
  return () => {
    layers = layers.filter((l) => l !== layer);
    if (layers.length === 0) stopListening();
  };
}

/** Whether any popup layer is currently open. */
export function hasEscapeLayer(): boolean {
  return layers.length > 0;
}
