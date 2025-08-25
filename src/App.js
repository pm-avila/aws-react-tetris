import React, { useState, useEffect } from 'react';

import GameBoard from './components/GameBoard';
import GameInfo from './components/GameInfo';
import NextPiece from './components/NextPiece';

import { createStage, checkCollision } from './gameHelpers';
import './index.css'; // We will use index.css for global styles

// Custom Hooks
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';
import { useInterval } from './hooks/useInterval';
import { useGameStatus } from './hooks/useGameStatus';

function App() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);


  const [
    player,
    nextTetromino,
    updatePlayerPos,
    resetPlayer,
    playerRotate,
  ] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  useEffect(() => {
    if (!gameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score);
    }
  }, [score, highScore, gameOver]);


  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    setIsPaused(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const hardDrop = () => {
    let y = 0;
    while (!checkCollision(player, stage, { x: 0, y: y + 1 })) {
      y++;
    }
    updatePlayerPos({ x: 0, y, collided: true });
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 80) { // P
        togglePause();
        return;
      }
      if (isPaused) return;

      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      } else if (keyCode === 32) { // Space
        hardDrop();
      }
    }
  };

  useInterval(() => {
    drop();
  }, isPaused ? null : dropTime);

  return (
    <div
      className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center font-mono"
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={e => !gameOver && !isPaused && e.keyCode === 40 && setDropTime(1000 / (level + 1) + 200)}
      onFocus={(e) => e.target.requestPointerLock()}
    >
      <h1 className="text-4xl font-bold mb-4">Tetris</h1>
      <div className="flex gap-8">
        <GameBoard stage={stage} />
        <aside className="w-64 flex flex-col gap-4">
          {gameOver ? (
            <GameInfo text="Game Over" score={score} highScore={highScore} />
          ) : (
            <>
              <NextPiece piece={nextTetromino} />
              <GameInfo score={score} level={level} lines={rows} highScore={highScore} />
              <button
                onClick={startGame}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Start Game
              </button>
              <button
                onClick={togglePause}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              {isPaused && <GameInfo text="Paused" />}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
