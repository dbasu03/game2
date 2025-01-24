import React from 'react';

function Car({ position }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
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
