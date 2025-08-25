import React from 'react';
import Cell from './Cell';

const GameBoard = ({ stage }) => {
  return (
    <div
      className="grid gap-px border-4 border-gray-600 rounded-lg bg-gray-900"
      style={{
        gridTemplateRows: `repeat(${stage.length}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${stage[0].length}, minmax(0, 1fr))`,
        width: '100%',
        maxWidth: '300px',
        aspectRatio: '10 / 20',
      }}
    >
      {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </div>
  );
};

export default GameBoard;
