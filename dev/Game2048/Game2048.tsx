import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import { Dialog } from '../../src/components/Dialog';
import { Tile, Direction, GRID_SIZE, TILE_COLORS } from './types';
import { loadState, saveState, clearState, initGame, move, addRandomTile, checkWin, checkGameOver } from './gameLogic';
import { game2048I18n } from './i18n';

// Base sizes (will be scaled to fit container)
const BASE_CELL_SIZE = 70;
const BASE_GAP = 8;
const BASE_BOARD_PADDING = 8;

/**
 * 2048 - The classic sliding tile puzzle game.
 * Swipe or use arrow keys to combine tiles and reach 2048!
 */
function Game2048Content() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [tiles, setTiles] = useState<Tile[]>(() => {
    const saved = loadState();
    return saved ? saved.tiles : initGame().tiles;
  });
  const [score, setScore] = useState(() => {
    const saved = loadState();
    return saved ? saved.score : 0;
  });
  const [bestScore, setBestScore] = useState(() => {
    const saved = loadState();
    return saved ? saved.bestScore : 0;
  });
  const [gameOver, setGameOver] = useState(() => {
    const saved = loadState();
    return saved ? saved.gameOver : false;
  });
  const [won, setWon] = useState(() => {
    const saved = loadState();
    return saved ? saved.won : false;
  });
  const [continueAfterWin, setContinueAfterWin] = useState(() => {
    const saved = loadState();
    return saved ? saved.continueAfterWin : false;
  });
  const [showRules, setShowRules] = useState(false);

  // Touch handling refs
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Observe container size for responsive scaling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Calculate scale factor to fit board in available space
  const baseBoardSize = BASE_BOARD_PADDING * 2 + GRID_SIZE * BASE_CELL_SIZE + (GRID_SIZE - 1) * BASE_GAP;
  // Reserve space for header (~50px), scores (~60px), instructions (~30px), and gaps (~36px)
  const reservedHeight = 176;
  const availableHeight = containerSize.height - reservedHeight;
  const availableWidth = containerSize.width - 16; // 8px padding on each side

  // Scale to fit the smaller dimension, with a max scale of 1
  const scale = Math.min(1, availableWidth / baseBoardSize, Math.max(0.5, availableHeight / baseBoardSize));

  // Scaled dimensions
  const CELL_SIZE = Math.floor(BASE_CELL_SIZE * scale);
  const GAP = Math.floor(BASE_GAP * scale);
  const BOARD_PADDING = Math.floor(BASE_BOARD_PADDING * scale);

  // Save state whenever it changes
  useEffect(() => {
    const newBest = Math.max(bestScore, score);
    if (newBest > bestScore) {
      setBestScore(newBest);
    }
    saveState({ tiles, score, bestScore: newBest, gameOver, won, continueAfterWin });
  }, [tiles, score, bestScore, gameOver, won, continueAfterWin]);

  const resetGame = useCallback(() => {
    clearState();
    const { tiles: newTiles, score: newScore } = initGame();
    setTiles(newTiles);
    setScore(newScore);
    setGameOver(false);
    setWon(false);
    setContinueAfterWin(false);
  }, []);

  const handleMove = useCallback(
    (direction: Direction) => {
      if (gameOver) return;
      if (won && !continueAfterWin) return;

      const result = move(tiles, direction);
      if (!result.moved) return;

      let newTiles = addRandomTile(result.tiles);
      const newScore = score + result.score;
      setTiles(newTiles);
      setScore(newScore);

      // Check win (only if not already won)
      if (!won && checkWin(newTiles)) {
        setWon(true);
      }

      // Check game over
      if (checkGameOver(newTiles)) {
        setGameOver(true);
      }
    },
    [tiles, score, gameOver, won, continueAfterWin]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        handleMove('up');
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        e.preventDefault();
        handleMove('down');
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        e.preventDefault();
        handleMove('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        e.preventDefault();
        handleMove('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  // Touch controls
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const minSwipe = 30;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > minSwipe) {
          handleMove(dx > 0 ? 'right' : 'left');
        }
      } else {
        if (Math.abs(dy) > minSwipe) {
          handleMove(dy > 0 ? 'down' : 'up');
        }
      }

      touchStartRef.current = null;
    },
    [handleMove]
  );

  const handleContinue = useCallback(() => {
    setContinueAfterWin(true);
  }, []);

  const getTileStyle = (tile: Tile): React.CSSProperties => {
    const colors = TILE_COLORS[tile.value] || TILE_COLORS[4096];
    const baseFontSize = tile.value >= 1000 ? 24 : tile.value >= 100 ? 28 : 32;
    const fontSize = Math.floor(baseFontSize * scale);

    return {
      position: 'absolute',
      width: CELL_SIZE,
      height: CELL_SIZE,
      left: BOARD_PADDING + tile.col * (CELL_SIZE + GAP),
      top: BOARD_PADDING + tile.row * (CELL_SIZE + GAP),
      background: colors.bg,
      color: colors.text,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize,
      fontWeight: 'bold',
      borderRadius: Math.floor(6 * scale),
      transition: 'left 100ms ease-out, top 100ms ease-out',
      animation: tile.isNew ? 'tile-appear 150ms ease-out' : tile.mergedFrom ? 'tile-pop 150ms ease-out' : undefined,
      zIndex: tile.mergedFrom ? 2 : 1,
    };
  };

  const boardWidth = BOARD_PADDING * 2 + GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * GAP;

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: Math.floor(12 * scale),
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* CSS animations */}
      <style>
        {`
          @keyframes tile-appear {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes tile-pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      {/* Header with scores */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          background: 'var(--surface)',
          borderRadius: 8,
          border: '1px solid var(--border)',
          gap: 8,
        }}
      >
        <button
          onClick={() => setShowRules(true)}
          style={{
            padding: '4px 8px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: 'var(--button-bg)',
            color: 'var(--text)',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          📖 {t('rules')}
        </button>

        <button
          onClick={resetGame}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: 'var(--button-bg)',
            color: 'var(--text)',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          🔄 {t('newGame')}
        </button>
      </div>

      {/* Score display */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: Math.floor(16 * scale),
        }}
      >
        <div
          style={{
            padding: `${Math.floor(8 * scale)}px ${Math.floor(16 * scale)}px`,
            background: '#bbada0',
            borderRadius: Math.floor(6 * scale),
            textAlign: 'center',
            minWidth: Math.floor(80 * scale),
          }}
        >
          <div style={{ fontSize: Math.floor(11 * scale), color: '#eee4da', fontWeight: 'bold' }}>{t('score')}</div>
          <div style={{ fontSize: Math.floor(20 * scale), fontWeight: 'bold', color: '#fff' }}>{score}</div>
        </div>
        <div
          style={{
            padding: `${Math.floor(8 * scale)}px ${Math.floor(16 * scale)}px`,
            background: '#bbada0',
            borderRadius: Math.floor(6 * scale),
            textAlign: 'center',
            minWidth: Math.floor(80 * scale),
          }}
        >
          <div style={{ fontSize: Math.floor(11 * scale), color: '#eee4da', fontWeight: 'bold' }}>{t('best')}</div>
          <div style={{ fontSize: Math.floor(20 * scale), fontWeight: 'bold', color: '#fff' }}>{bestScore}</div>
        </div>
      </div>

      {/* Game board */}
      <div
        ref={boardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: boardWidth,
          height: boardWidth,
          background: '#bbada0',
          borderRadius: Math.floor(8 * scale),
          padding: BOARD_PADDING,
          margin: '0 auto',
          touchAction: 'none',
          flexShrink: 0,
        }}
      >
        {/* Grid cells (background) */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const row = Math.floor(i / GRID_SIZE);
          const col = i % GRID_SIZE;
          return (
            <div
              key={`cell-${row}-${col}`}
              style={{
                position: 'absolute',
                width: CELL_SIZE,
                height: CELL_SIZE,
                left: BOARD_PADDING + col * (CELL_SIZE + GAP),
                top: BOARD_PADDING + row * (CELL_SIZE + GAP),
                background: 'rgba(238, 228, 218, 0.35)',
                borderRadius: Math.floor(6 * scale),
              }}
            />
          );
        })}

        {/* Tiles */}
        {tiles.map((tile) => (
          <div key={tile.id} style={getTileStyle(tile)}>
            {tile.value}
          </div>
        ))}

        {/* Win overlay */}
        {won && !continueAfterWin && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(237, 194, 46, 0.5)',
              borderRadius: Math.floor(8 * scale),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: Math.floor(16 * scale),
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: Math.floor(36 * scale), fontWeight: 'bold', color: '#776e65' }}>{t('youWon')}</div>
            <div style={{ display: 'flex', gap: Math.floor(8 * scale) }}>
              <button
                onClick={handleContinue}
                style={{
                  padding: `${Math.floor(8 * scale)}px ${Math.floor(16 * scale)}px`,
                  borderRadius: Math.floor(6 * scale),
                  border: 'none',
                  background: '#8f7a66',
                  color: '#f9f6f2',
                  cursor: 'pointer',
                  fontSize: Math.floor(14 * scale),
                  fontWeight: 'bold',
                }}
              >
                {t('keepGoing')}
              </button>
              <button
                onClick={resetGame}
                style={{
                  padding: `${Math.floor(8 * scale)}px ${Math.floor(16 * scale)}px`,
                  borderRadius: Math.floor(6 * scale),
                  border: 'none',
                  background: '#8f7a66',
                  color: '#f9f6f2',
                  cursor: 'pointer',
                  fontSize: Math.floor(14 * scale),
                  fontWeight: 'bold',
                }}
              >
                {t('tryAgain')}
              </button>
            </div>
          </div>
        )}

        {/* Game over overlay */}
        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(238, 228, 218, 0.73)',
              borderRadius: Math.floor(8 * scale),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: Math.floor(16 * scale),
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: Math.floor(36 * scale), fontWeight: 'bold', color: '#776e65' }}>{t('gameOver')}</div>
            <button
              onClick={resetGame}
              style={{
                padding: `${Math.floor(8 * scale)}px ${Math.floor(24 * scale)}px`,
                borderRadius: Math.floor(6 * scale),
                border: 'none',
                background: '#8f7a66',
                color: '#f9f6f2',
                cursor: 'pointer',
                fontSize: Math.floor(14 * scale),
                fontWeight: 'bold',
              }}
            >
              {t('tryAgain')}
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div style={{ fontSize: Math.floor(12 * scale), color: 'var(--text-weak)', textAlign: 'center' }}>{t('instructions')}</div>

      {/* Rules Dialog */}
      <Dialog
        open={showRules}
        onClose={() => setShowRules(false)}
        title={t('title')}
        width={400}
        footerType="gotit"
        maxHeight={"80%"}
      >
        <div style={{ color: 'var(--text)', lineHeight: 1.6 }}>
          <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>{t('howToPlay')}</h3>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>{t('rule1')}</li>
            <li>{t('rule2')}</li>
            <li>{t('rule3')}</li>
            <li>{t('rule4')}</li>
          </ul>

          <h3 style={{ marginTop: 16, color: 'var(--success)' }}>{t('tips')}</h3>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>{t('tip1')}</li>
            <li>{t('tip2')}</li>
            <li>{t('tip3')}</li>
          </ul>
        </div>
      </Dialog>
    </div>
  );
}

export function Game2048() {
  return (
    <I18nextProvider i18n={game2048I18n}>
      <Game2048Content />
    </I18nextProvider>
  );
}
