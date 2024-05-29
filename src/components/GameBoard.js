import React, { useState, useEffect } from 'react';

const BOARD_SIZE = 25; 
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

// Function to get a random position on the board
const getRandomPosition = () => {
  const x = Math.floor(Math.random() * BOARD_SIZE);
  const y = Math.floor(Math.random() * BOARD_SIZE);
  return { x, y };
};

const GameBoard = ({ onGameOver }) => {
  const [snake, setSnake] = useState([{ x: 12, y: 12 }]); // Initial snake position
  const [food, setFood] = useState(getRandomPosition()); // Initial food position
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT); // Initial direction
  const [nextDirection, setNextDirection] = useState(DIRECTIONS.RIGHT); // Next direction
  const [fadeClass, setFadeClass] = useState(""); // Class for fade-in and fade-out effects

  // Effect to handle keydown events for changing direction
  useEffect(() => {
    const handleKeyDown = (e) => {
      let newDirection;
      switch (e.key) {
        case 'ArrowUp':
          newDirection = DIRECTIONS.UP;
          break;
        case 'ArrowDown':
          newDirection = DIRECTIONS.DOWN;
          break;
        case 'ArrowLeft':
          newDirection = DIRECTIONS.LEFT;
          break;
        case 'ArrowRight':
          newDirection = DIRECTIONS.RIGHT;
          break;
        default:
          return;
      }

      // Ensure the new direction is not directly opposite to the current direction
      if (newDirection.x !== -direction.x && newDirection.y !== -direction.y) {
        setNextDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Effect to handle the snake movement and game logic
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(nextDirection);
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += nextDirection.x;
        head.y += nextDirection.y;

        // Check if the snake hits the wall or itself
        if (
          head.x < 0 ||
          head.x >= BOARD_SIZE ||
          head.y < 0 ||
          head.y >= BOARD_SIZE ||
          newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          // Trigger fade-out effect and game over callback
          setFadeClass("fade-out");
          setTimeout(() => {
            onGameOver();
            setFadeClass("");
          }, 500);
          clearInterval(interval);
          return prevSnake;
        }

        // Move the snake
        newSnake.unshift(head);

        // Check if the snake eats the food
        if (head.x === food.x && head.y === food.y) {
          setFood(getRandomPosition());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [nextDirection, food, onGameOver]);

  return (
    <div className={`board ${fadeClass}`}>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="snake"
          style={{ gridColumn: segment.x + 1, gridRow: segment.y + 1 }}
        ></div>
      ))}
      <div
        className="food"
        style={{ gridColumn: food.x + 1, gridRow: food.y + 1 }}
      ></div>
    </div>
  );
};

export default GameBoard;
