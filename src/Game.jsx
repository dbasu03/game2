/*import React, { useState, useEffect, useRef } from 'react';
import Player from './Player';
import GameObject from './GameObject';

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [objects, setObjects] = useState([]);
  const playerRef = useRef(null);

  // Handle key press to move player
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      playerRef.current.moveUp();
    } else if (e.key === 'ArrowDown') {
      playerRef.current.moveDown();
    }
  };

  // Generate objects moving from the right side
  const generateObject = () => {
    if (!gameOver) {
      setObjects((prevObjects) => [
        ...prevObjects,
        { id: Date.now(), x: window.innerWidth, y: Math.random() * 500, speed: Math.random() * 6 + 6 }, // Increased speed
      ]);
    }
  };

  // Move objects and check for collisions
  useEffect(() => {
    const interval = setInterval(() => {
      setObjects((prevObjects) => {
        const updatedObjects = prevObjects.map((obj) => ({
          ...obj,
          x: obj.x - obj.speed,
        }));

        // Check for collisions with the player
        updatedObjects.forEach((obj) => {
          if (
            obj.x < 80 && // Check if the object is near the player
            obj.y > playerRef.current.y && obj.y < playerRef.current.y + 50
          ) {
            setGameOver(true);
          }
        });

        // Remove objects that are off-screen
        return updatedObjects.filter((obj) => obj.x > 0);
      });

      if (!gameOver) {
        setScore((prevScore) => prevScore + 1);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const objectGenerationInterval = setInterval(generateObject, 1000); // Increased frequency of object generation
    return () => clearInterval(objectGenerationInterval);
  }, []);

  // Restart the game by resetting the state
  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setObjects([]);
  };

  return (
    <div
      tabIndex={0}
      style={{
        position: 'relative',
        width: '800px', // Fixed width for the game area
        height: '400px', // Fixed height for the game area
        overflow: 'hidden',
        background: 'black',
        color: 'white',
        border: '2px solid white', // Add a border around the game area
        margin: '0 auto', // Center the game area horizontally
      }}
      onKeyDown={handleKeyDown}
    >
      <Player ref={playerRef} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/space-background.jpg") repeat-x',
          animation: 'moveBackground 5s linear infinite',
        }}
      ></div>
      {objects.map((obj) => (
        <GameObject key={obj.id} x={obj.x} y={obj.y} />
      ))}
      {gameOver && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'red',
          }}
        >
          Game Over! Score: {score}
          <br />
          <button
            onClick={restartGame}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Restart
          </button>
        </div>
      )}
      <div style={{ position: 'absolute', top: 20, left: 20 }}>Score: {score}</div>
    </div>
  );
};

export default Game;
*/
import React, { useState, useEffect, useRef } from 'react';
import GameObject from './GameObject';

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [objects, setObjects] = useState([]);
  const playerRef = useRef(null);
  const playerY = useRef(200); // Adjusted player Y position since the screen is shorter
  const velocity = 5; // The movement speed of the player

  // Handle key press to move player smoothly
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      movePlayer(-velocity); // Move player up
    } else if (e.key === 'ArrowDown') {
      movePlayer(velocity); // Move player down
    }
  };

  // Smooth movement function using requestAnimationFrame
  const movePlayer = (direction) => {
    const newY = playerY.current + direction;

    // Constrain movement within the game area
    if (newY >= 0 && newY <= 350) { // Prevent player from going out of bounds in the reduced screen height
      playerY.current = newY;
      playerRef.current.style.transform = `translateY(${playerY.current}px)`;
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    const touchY = e.touches[0].clientY;
    playerY.current = touchY - playerRef.current.offsetHeight / 2;
    playerRef.current.style.transform = `translateY(${playerY.current}px)`;
  };

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    const newY = touchY - playerRef.current.offsetHeight / 2;

    // Constrain movement within the game area
    if (newY >= 0 && newY <= 350) { // Prevent player from going out of bounds
      playerY.current = newY;
      playerRef.current.style.transform = `translateY(${playerY.current}px)`;
    }
  };

  const handleTouchEnd = () => {
    // Handle touch end (optional, can be left empty)
  };

  // Generate objects moving from the right side
  const generateObject = () => {
    if (!gameOver) {
      setObjects((prevObjects) => [
        ...prevObjects,
        { id: Date.now(), x: window.innerWidth, y: Math.random() * 350, speed: Math.random() * 10 + 10 },
      ]);
    }
  };

  // Move objects and check for collisions
  useEffect(() => {
    const interval = setInterval(() => {
      setObjects((prevObjects) => {
        const updatedObjects = prevObjects.map((obj) => ({
          ...obj,
          x: obj.x - obj.speed,
        }));

        // Check for collisions with the player
        updatedObjects.forEach((obj) => {
          if (
            obj.x < 80 && // Check if the object is near the player
            obj.y > playerY.current && obj.y < playerY.current + 50
          ) {
            setGameOver(true);
          }
        });

        // Remove objects that are off-screen
        return updatedObjects.filter((obj) => obj.x > 0);
      });

      if (!gameOver) {
        setScore((prevScore) => prevScore + 1);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Dynamic frequency based on score (increase difficulty as score increases)
  useEffect(() => {
    const frequency = Math.random() * 1000; // Maximum speed (obstacle generation) happens as score increases
    const objectGenerationInterval = setInterval(generateObject, frequency);

    return () => clearInterval(objectGenerationInterval);
  }, [score]);

  // Restart the game by resetting the state
  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setObjects([]);
    playerY.current = 200; // Reset player position to middle of reduced height
    playerRef.current.style.transform = `translateY(${playerY.current}px)`; // Reset player visual position
  };

  return (
    <div
      tabIndex={0}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh', // Take full screen height
        overflow: 'hidden',
        backgroundColor: '#1a1a1a', // Set the background for the page outside the container
        color: 'white',
      }}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw', // Use 80% of viewport width for responsiveness
          height: '60vh', // Use 60% of viewport height for responsiveness
          overflow: 'hidden',
          backgroundColor: 'black', // Background inside the game container
          border: '2px solid white',
        }}
      >
        <div
          ref={playerRef}
          style={{
            position: 'absolute',
            left: '5vw', // Position player in relation to viewport width
            top: `${playerY.current}px`,
            width: '10vw', // Player width based on viewport width
            height: '10vh', // Player height based on viewport height
            backgroundColor: 'red', // Example player styling
            transition: 'transform 0.1s ease-out', // Smooth transition for movement
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/space-background.jpg") repeat-x',
            animation: 'moveBackground 5s linear infinite',
          }}
        ></div>
        {objects.map((obj) => (
          <GameObject key={obj.id} x={obj.x} y={obj.y} />
        ))}
        {gameOver && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '5vw', // Font size for mobile screens
              fontWeight: 'bold',
              color: 'red',
            }}
          >
            Game Over! Score: {score}
            <br />
            <button
              onClick={restartGame}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Restart
            </button>
          </div>
        )}
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>Score: {score}</div>
      </div>
    </div>
  );
};

export default Game;
