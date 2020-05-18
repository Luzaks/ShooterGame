import gameMocked from './gameMock';

describe('It test the mock of the game Phaser config well as It\'s visibility.', () => {
  test('Check the visibility of the game.', () => {
    const visibility = expect(gameMocked).toBeVisible;
  });
  test('Check the state of the game.', () => {
    const state = expect(gameMocked).toBeEnabled;
  });
  test('Check the type of the game mocked returned.', () => {
    expect(typeof gameMocked).toBe('function');
  });
  test('Check if the game returned in the function not throw errors back.', () => {
    expect(gameMocked).not.toThrow();
  });
});