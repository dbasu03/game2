import React from 'react';

function Car({ position }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px', // Position the player's car at the bottom of the road
        left: `${position}px`,
        width: '50px',
        height: '100px',
        backgroundColor: 'blue',
        borderRadius: '10px',
      }}
    />
  );
}

export default Car;
