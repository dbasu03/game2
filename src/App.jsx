import React, { useState, useEffect } from 'react';
import Car from './Car';
import Traffic from './Traffic';
import './App.css';

const roadWidth = 600; 
const roadHeight = 800; 
const carWidth = 50; 
const carHeight = 100; 

function App() {
  const [playerPosition, setPlayerPosition] = useState(roadWidth / 2 - carWidth / 2);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const handleTouchStart = (e) => {
    const touch = e.touches[0]; 
    setIsDragging(true);
    setDragStartX(touch.clientX); 
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0]; 
      const deltaX = touch.clientX - dragStartX;
      let newPosition = playerPosition + deltaX;
      
      newPosition = Math.max(0, Math.min(roadWidth - carWidth, newPosition));
      setPlayerPosition(newPosition);
      setDragStartX(touch.clientX); 
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false); 
  };

  
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
        <Car
          position={playerPosition}
        />
        
        <Traffic roadWidth={roadWidth} roadHeight={roadHeight} />
      </div>
    </div>
  );
}

export default App;
