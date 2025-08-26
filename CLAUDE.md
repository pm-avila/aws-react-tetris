# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Runs the app in development mode on http://localhost:3000
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production to the `build` folder

### Testing
Run `npm test` to execute Jest tests. The test file is located at `src/gameHelpers.test.js` and tests core game mechanics like collision detection and stage creation.

## Architecture

This is a classic Tetris game built with React using functional components and custom hooks.

### Core Game Architecture

The game follows a React hooks-based architecture with clear separation of concerns:

- **App.js**: Main game controller managing overall game state, user input, and game loop
- **gameHelpers.js**: Pure functions for game logic (collision detection, stage creation, tetromino definitions)
- **Custom Hooks** (in `/src/hooks/`):
  - `usePlayer`: Manages current and next tetromino state, rotation, and positioning
  - `useStage`: Handles the game board state, row clearing, and tetromino placement
  - `useGameStatus`: Tracks score, level, and cleared rows
  - `useInterval`: Custom interval hook for game timing

### Key Game Components

- **GameBoard**: Renders the 10x20 game grid using CSS Grid
- **Cell**: Individual cell component with Tetris piece-specific colors
- **GameInfo**: Displays score, level, lines cleared, and high score
- **NextPiece**: Shows the upcoming tetromino

### Game State Management

Game state is managed through React hooks without external state management:
- Player position and current tetromino via `usePlayer`
- Game board and row clearing via `useStage` 
- Scoring system via `useGameStatus`
- High score persisted in localStorage

### Controls
- Arrow Keys: Left/Right movement, Down for soft drop, Up for rotation
- Space Bar: Hard drop
- P Key: Pause/Resume

### Styling
Uses Tailwind CSS with custom Tetris piece colors defined in `tailwind.config.js`. Each tetromino type has its own color (I=cyan, J=blue, L=orange, O=yellow, S=green, T=purple, Z=red).

### Game Logic
- 20x10 game board with collision detection
- Seven standard tetromino pieces with rotation
- Line clearing with level progression (every 10 rows)
- Speed increases with level
- Game over when pieces reach the top