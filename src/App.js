import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
    setGameOver(false);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleRestart = () => {
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>Snake Game</h1>
      {gameStarted ? (
        <>
          {!gameOver && <GameBoard onGameOver={handleGameOver} />}
          {gameOver && (
            <div className="game-over-container fade-in visible">
              <h2>Game Over</h2>
              <button className="restart-button" onClick={handleRestart}>
                Restart Game
              </button>
            </div>
          )}
        </>
      ) : (
        <button className="start-button" onClick={handleStart}>Start Game</button>
      )}
      {!gameStarted && gameOver && (
        <GameBoard onGameOver={handleGameOver} />
      )}
    </div>
  );
};

export default App;



