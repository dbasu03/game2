import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Player = forwardRef((_, ref) => {
  const [y, setY] = useState(250); // Starting vertical position

  const moveUp = () => setY((prevY) => Math.max(0, prevY - 10));
  const moveDown = () => setY((prevY) => Math.min(window.innerHeight - 50, prevY + 10));

  useImperativeHandle(ref, () => ({
    moveUp,
    moveDown,
    y,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 50,
        width: '50px',
        height: '50px',
        backgroundColor: 'blue',
        borderRadius: '50%',
      }}
    />
  );
});

export default Player;
