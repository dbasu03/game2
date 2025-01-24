import React, { useState, useEffect } from 'react';

function Traffic({ roadWidth, roadHeight }) {
  const [cars, setCars] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCar = {
        id: Date.now(),
        position: Math.random() * roadWidth,
        speed: Math.random() * 4 + 2, 
        yPos: -100, 
      };
      setCars((prevCars) => [...prevCars, newCar]);
    }, 1000); 

    return () => clearInterval(interval);
  }, [roadWidth]);

  
  useEffect(() => {
    const moveCars = setInterval(() => {
      setCars((prevCars) => {
        return prevCars
          .map((car) => ({
            ...car,
            yPos: car.yPos + car.speed, 
          }))
          .filter((car) => car.yPos < roadHeight); 
      });
      setScore((prevScore) => prevScore + 1); 
    }, 1000 / 60); 

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
