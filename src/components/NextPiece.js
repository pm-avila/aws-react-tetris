import React from 'react';
import Cell from './Cell';

const NextPiece = ({ piece }) => {
  // Create a 4x4 grid. If the piece is null, create an empty grid.
  const stage = Array.from(Array(4), () => new Array(4).fill([0, 'clear']));

  // "Draw" the piece onto the small grid
  if (piece) {
    // We need to find the offset to center the piece in the 4x4 grid
    const offsetX = Math.floor((4 - piece[0].length) / 2);
    const offsetY = Math.floor((4 - piece.length) / 2);

    piece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          stage[y + offsetY][x + offsetX] = [value, 'clear'];
        }
      });
    });
  }

  return (
    <div className="w-full p-4 bg-gray-900 border-4 border-gray-600 rounded-lg">
      <h2 className="text-center text-white font-bold mb-2">Next</h2>
      <div className="grid grid-rows-4 grid-cols-4 gap-px w-20 h-20 mx-auto">
        {stage.map((row, y) => row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell[0]} />))}
      </div>
    </div>
  );
};

export default NextPiece;
