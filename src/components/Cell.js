import React from 'react';
import { TETROMINOS } from '../gameHelpers';

const Cell = ({ type }) => {
  if (type === 0) {
    return <div className="bg-gray-900" />;
  }

  const color = TETROMINOS[type].color;
  const colorMap = {
    'I': 'bg-I',
    'J': 'bg-J',
    'L': 'bg-L',
    'O': 'bg-O',
    'S': 'bg-S',
    'T': 'bg-T',
    'Z': 'bg-Z',
  };

  return (
    <div
      className={`w-full h-full ${colorMap[type]}`}
      style={{
        border: '4px solid transparent',
        borderBottomColor: `rgba(${color}, 0.2)`,
        borderRightColor: `rgba(${color}, 0.8)`,
        borderTopColor: `rgba(${color}, 0.9)`,
        borderLeftColor: `rgba(${color}, 0.4)`,
      }}
    />
  );
};

export default Cell;
