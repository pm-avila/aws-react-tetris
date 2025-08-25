import { createStage, checkCollision, STAGE_WIDTH, STAGE_HEIGHT } from './gameHelpers';

describe('createStage', () => {
  it('should create a stage with the correct dimensions', () => {
    const stage = createStage();
    expect(stage.length).toBe(STAGE_HEIGHT);
    expect(stage[0].length).toBe(STAGE_WIDTH);
  });

  it('should initialize each cell correctly', () => {
    const stage = createStage();
    expect(stage[0][0]).toEqual([0, 'clear']);
  });
});

describe('checkCollision', () => {
  let player;
  let stage;

  beforeEach(() => {
    player = {
      pos: { x: 4, y: 0 },
      tetromino: [[1, 1], [1, 1]], // A 2x2 'O' piece
      collided: false,
    };
    stage = createStage();
  });

  it('should return false when there is no collision', () => {
    const move = { x: 0, y: 1 };
    expect(checkCollision(player, stage, move)).toBe(false);
  });

  it('should return true when colliding with the bottom wall', () => {
    player.pos.y = STAGE_HEIGHT - 2;
    const move = { x: 0, y: 1 };
    expect(checkCollision(player, stage, move)).toBe(true);
  });

  it('should return true when colliding with the left wall', () => {
    player.pos.x = -1;
    const move = { x: 0, y: 0 };
    expect(checkCollision(player, stage, move)).toBe(true);
  });

  it('should return true when colliding with the right wall', () => {
    player.pos.x = STAGE_WIDTH - 1;
    const move = { x: 0, y: 0 };
    expect(checkCollision(player, stage, move)).toBe(true);
  });

  it('should return true when colliding with another piece', () => {
    // Place another piece on the stage
    stage[1][5] = ['J', 'merged'];
    player.pos.y = 0;
    const move = { x: 1, y: 1 }; // Move into the merged cell
    player.tetromino = [[0, 'J'], ['J', 'J']];
    player.pos.x = 4;

    // This setup is a bit tricky. Let's simplify.
    // Let's place a block right under the player
    stage[2][4] = ['T', 'merged'];
    player.pos.y = 0;
    const simpleMove = { x: 0, y: 1 };
    expect(checkCollision(player, stage, simpleMove)).toBe(true);
  });
});
