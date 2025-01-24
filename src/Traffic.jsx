import React, { useState, useEffect } from 'react';

function Traffic({ roadWidth, roadHeight }) {
  const [cars, setCars] = useState([]);
  const [score, setScore] = useState(0);

  // Generate new cars at random positions and speeds
  useEffect(() => {
    const interval = setInterval(() => {
      const newCar = {
        id: Date.now(),
        position: Math.random() * roadWidth,
        speed: Math.random() * 4 + 2, // Random speed
        yPos: -100, // Start above the screen
      };
      setCars((prevCars) => [...prevCars, newCar]);
    }, 1000); // New car every second

    return () => clearInterval(interval);
  }, [roadWidth]);

  // Move cars down and check for collisions
  useEffect(() => {
    const moveCars = setInterval(() => {
      setCars((prevCars) => {
        return prevCars
          .map((car) => ({
            ...car,
            yPos: car.yPos + car.speed, // Move the car downwards
          }))
          .filter((car) => car.yPos < roadHeight); // Remove off-screen cars
      });
      setScore((prevScore) => prevScore + 1); // Increase score
    }, 1000 / 60); // Run at 60fps

    return () => clearInterval(moveCars);
  }, [roadHeight]);

  return (
    <div>
      {cars.map((car) => (
        <div
          key={car.id}
          style={{
            position: 'absolute',
            top: `${car.yPos}px`,
            left: `${car.position}px`,
            width: '50px',
            height: '100px',
            backgroundColor: 'red',
            borderRadius: '10px',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          fontSize: '20px',
        }}
      >
        Score: {score}
      </div>
    </div>
  );
}

export default Traffic;
