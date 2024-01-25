
import './App.css';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const gridSize = 20;
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    const gameLoop = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, 100);

    return () => clearInterval(gameLoop);
  }, [snake, direction]);

  const generateFood = () => {
    setFood({
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    });
  };

  const move = () => {
    const head = Object.assign({}, snake[0]);

    switch (direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
      default:
        break;
    }

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      setSnake([head, ...snake]);
      generateFood();
    } else {
      // Move snake
      setSnake([head, ...snake.slice(0, -1)]);
    }
  };

  const checkCollision = () => {
    const head = snake[0];

    // Check if snake hits walls or itself
    if (
      head.x < 0 ||
      head.x >= gridSize ||
      head.y < 0 ||
      head.y >= gridSize ||
      isSnakeCollision()
    ) {
      alert('Game Over!');
      resetGame();
    }
  };

  const isSnakeCollision = () => {
    const head = snake[0];
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection('right');
  };

  const draw = () => {
    // Draw snake
    // Draw food
    // Logic similar to the JavaScript version
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection('up');
        break;
      case 'ArrowDown':
        setDirection('down');
        break;
      case 'ArrowLeft':
        setDirection('left');
        break;
      case 'ArrowRight':
        setDirection('right');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="App">
      <div id="game-board">
        {
          snake.map((segment, index) => (
            <div
              key={index}
              className="snake"
              style={{ left: `${segment.x * 15}px`, top: `${segment.y * 15}px` }}
            ></div>
          ))}
          <div
            className="food"
            style={{ left: `${food.x * 15}px`, top: `${food.y * 15}px` }}
          ></div>
          
        
      </div>
    </div>
  );
}

export default App;
