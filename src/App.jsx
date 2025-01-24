import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [balloonY, setBalloonY] = useState(300);
  const [velocity, setVelocity] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);

  // Balloon jump logic
  const jump = () => {
    if (gameOver) return;
    setVelocity(-10); // Make the balloon go up
  };

  // Handling obstacles and game logic
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      // Update balloon's vertical position
      setBalloonY((prevY) => prevY + velocity);
      setVelocity((prevVelocity) => prevVelocity + 1); // Gravity effect

      // Check for ground collision
      if (balloonY >= 600) {
        setBalloonY(600);
        setVelocity(0);
      }

      // Check for ceiling collision
      if (balloonY <= 0) {
        setBalloonY(0);
        setVelocity(0);
      }

      // Create new obstacles
      if (Math.random() < 0.02) {
        setObstacles((prevObstacles) => [
          ...prevObstacles,
          {
            x: 800,
            y: Math.random() * 500 + 100,
          },
        ]);
      }

      // Move obstacles and check collision
      setObstacles((prevObstacles) =>
        prevObstacles
          .map((obstacle) => ({ ...obstacle, x: obstacle.x - 3 }))
          .filter((obstacle) => obstacle.x > -50)
          .map((obstacle) => {
            if (
              obstacle.x > 40 &&
              obstacle.x < 60 &&
              Math.abs(balloonY - obstacle.y) < 50
            ) {
              setGameOver(true);
            }
            return obstacle;
          })
      );

      // Update score
      setScore((prevScore) => prevScore + 1);
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(interval);
  }, [velocity, balloonY, obstacles, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const restartGame = () => {
    setBalloonY(300);
    setVelocity(0);
    setGameOver(false);
    setObstacles([]);
    setScore(0);
  };

  return (
    <div className="game-container">
      <h1>Hot Air Balloon Game</h1>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your Score: {score}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
      <div
        className="balloon"
        style={{
          bottom: `${balloonY}px`,
        }}
      ></div>
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className="obstacle"
          style={{
            left: `${obstacle.x}px`,
            height: `${obstacle.y}px`,
          }}
        ></div>
      ))}
      <p>Score: {score}</p>
    </div>
  );
}

export default App;
