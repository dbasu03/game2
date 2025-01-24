import React from 'react';

const GameObject = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: '30px',
        height: '30px',
        backgroundColor: 'red',
        borderRadius: '50%',
      }}
    />
  );
};

export default GameObject;
