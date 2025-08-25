import React from 'react';

const GameInfo = ({ score, level, lines, highScore, text }) => {
  if (text) {
    return (
      <div className="w-full p-4 my-4 text-center text-white bg-gray-900 border-4 border-gray-600 rounded-lg">
        <h2 className="text-2xl font-bold">{text}</h2>
        {score !== undefined && <h3 className="text-xl">Score: {score}</h3>}
        {highScore !== undefined && <h3 className="text-xl">High Score: {highScore}</h3>}
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-gray-900 border-4 border-gray-600 rounded-lg text-white">
      <h2 className="font-bold">Score: <span className="font-normal">{score}</span></h2>
      <h2 className="font-bold">Level: <span className="font-normal">{level}</span></h2>
      <h2 className="font-bold">Lines: <span className="font-normal">{lines}</span></h2>
      <h2 className="font-bold">High Score: <span className="font-normal">{highScore}</span></h2>
    </div>
  );
};

export default GameInfo;
