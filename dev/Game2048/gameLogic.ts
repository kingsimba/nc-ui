import { Tile, GameState, GRID_SIZE, WIN_VALUE, STORAGE_KEY, Direction } from './types';

let nextTileId = 1;

export function loadState(): GameState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const state = JSON.parse(stored);
      // Restore nextTileId to be higher than any existing tile id
      if (state.tiles && state.tiles.length > 0) {
        nextTileId = Math.max(...state.tiles.map((t: Tile) => t.id)) + 1;
      }
      return state;
    }
  } catch (e) {
    // ignore parse errors
  }
  return null;
}

export function saveState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore storage errors
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore storage errors
  }
}

export function createTile(value: number, row: number, col: number, isNew = false): Tile {
  return {
    id: nextTileId++,
    value,
    row,
    col,
    isNew,
    mergedFrom: false,
  };
}

export function getEmptyCells(tiles: Tile[]): [number, number][] {
  const occupied = new Set(tiles.map((t) => `${t.row},${t.col}`));
  const empty: [number, number][] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!occupied.has(`${row},${col}`)) {
        empty.push([row, col]);
      }
    }
  }
  return empty;
}

export function addRandomTile(tiles: Tile[]): Tile[] {
  const emptyCells = getEmptyCells(tiles);
  if (emptyCells.length === 0) return tiles;

  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  return [...tiles, createTile(value, row, col, true)];
}

export function initGame(): { tiles: Tile[]; score: number } {
  nextTileId = 1;
  let tiles: Tile[] = [];
  tiles = addRandomTile(tiles);
  tiles = addRandomTile(tiles);
  return { tiles, score: 0 };
}

interface MoveResult {
  tiles: Tile[];
  score: number;
  moved: boolean;
}

export function move(tiles: Tile[], direction: Direction): MoveResult {
  // Clear animation flags
  let newTiles = tiles.map((t) => ({ ...t, mergedFrom: false, isNew: false }));
  let score = 0;
  let moved = false;

  const getVector = (): { dr: number; dc: number } => {
    switch (direction) {
      case 'up':
        return { dr: -1, dc: 0 };
      case 'down':
        return { dr: 1, dc: 0 };
      case 'left':
        return { dr: 0, dc: -1 };
      case 'right':
        return { dr: 0, dc: 1 };
    }
  };

  const { dr, dc } = getVector();

  // Determine traversal order
  const rows = Array.from({ length: GRID_SIZE }, (_, i) => i);
  const cols = Array.from({ length: GRID_SIZE }, (_, i) => i);
  if (dr === 1) rows.reverse(); // down: start from bottom
  if (dc === 1) cols.reverse(); // right: start from right

  for (const row of rows) {
    for (const col of cols) {
      const tile = newTiles.find((t) => t.row === row && t.col === col);
      if (!tile) continue;

      // Find farthest position in direction
      let newRow = row;
      let newCol = col;
      let nextRow = row + dr;
      let nextCol = col + dc;

      while (nextRow >= 0 && nextRow < GRID_SIZE && nextCol >= 0 && nextCol < GRID_SIZE) {
        const obstacle = newTiles.find((t) => t.row === nextRow && t.col === nextCol && t.id !== tile.id);

        if (obstacle) {
          // Check if can merge
          if (obstacle.value === tile.value && !obstacle.mergedFrom) {
            // Merge tiles
            newRow = nextRow;
            newCol = nextCol;
            // Remove both tiles and create merged one
            newTiles = newTiles.filter((t) => t.id !== tile.id && t.id !== obstacle.id);
            const mergedTile = createTile(tile.value * 2, newRow, newCol, false);
            mergedTile.mergedFrom = true;
            newTiles.push(mergedTile);
            score += tile.value * 2;
            moved = true;
          }
          break;
        }

        // Move to empty cell
        newRow = nextRow;
        newCol = nextCol;
        nextRow += dr;
        nextCol += dc;
      }

      // Update tile position if it moved but didn't merge
      if ((newRow !== row || newCol !== col) && newTiles.find((t) => t.id === tile.id)) {
        tile.row = newRow;
        tile.col = newCol;
        moved = true;
      }
    }
  }

  return { tiles: newTiles, score, moved };
}

export function checkWin(tiles: Tile[]): boolean {
  return tiles.some((t) => t.value >= WIN_VALUE);
}

export function checkGameOver(tiles: Tile[]): boolean {
  // If there are empty cells, game is not over
  if (getEmptyCells(tiles).length > 0) return false;

  // Check if any merges are possible
  for (const tile of tiles) {
    const { row, col, value } = tile;
    // Check right and down neighbors
    const right = tiles.find((t) => t.row === row && t.col === col + 1);
    const down = tiles.find((t) => t.row === row + 1 && t.col === col);
    if ((right && right.value === value) || (down && down.value === value)) {
      return false;
    }
  }

  return true;
}
