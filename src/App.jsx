import React, { useState, useEffect } from 'react';
import Car from './Car';
import Traffic from './Traffic';
import './App.css';

const roadWidth = 600; // Road width
const roadHeight = 800; // Road height
const carWidth = 50; // Player car width
const carHeight = 100; // Player car height

function App() {
  const [playerPosition, setPlayerPosition] = useState(roadWidth / 2 - carWidth / 2);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Handle touch events for dragging the car
  const handleTouchStart = (e) => {
    const touch = e.touches[0]; // Get the first touch
    setIsDragging(true);
    setDragStartX(touch.clientX); // Get the starting position of the drag
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0]; // Get the first touch
      const deltaX = touch.clientX - dragStartX;
      let newPosition = playerPosition + deltaX;
      // Prevent the car from going out of bounds
      newPosition = Math.max(0, Math.min(roadWidth - carWidth, newPosition));
      setPlayerPosition(newPosition);
      setDragStartX(touch.clientX); // Update the drag start position for smooth dragging
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false); // Stop dragging
  };

  // Listen for mouse events as a fallback (for non-touch devices)
  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStartX, playerPosition]);

  // Listen for arrow key presses to move the car (optional)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && playerPosition > 0) {
        setPlayerPosition(playerPosition - 10);
      } else if (e.key === 'ArrowRight' && playerPosition < roadWidth - carWidth) {
        setPlayerPosition(playerPosition + 10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition]);

  return (
    <div className="game-container">
      <div className="road" style={{ width: roadWidth, height: roadHeight }}>
        {/* Player's car with touch functionality */}
        <Car
          position={playerPosition}
        />
        
        {/* Traffic */}
        <Traffic roadWidth={roadWidth} roadHeight={roadHeight} />
      </div>
    </div>
  );
}

export default App;
