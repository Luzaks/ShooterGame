import * as storageSystem from '../src/ScoreSystem/storedScores'

describe('Test the localStorage system when the score container is not null', () => {
  storageSystem.storeScores(1000);
  storageSystem.storeScores(10);

  test('the current score', () => {
      expect(storageSystem.getCurrentScore()).toBe(10);
  });
  test('the max score', () => {
      expect(storageSystem.getMaxScore()).toBe(1000);
  });
  test('the scoresContainer', () => {
      expect(storageSystem.scoresContainer).not.toBeNull();
  });
  test('the scoresContainer length', () => {
      expect(storageSystem.scoresContainer.length).toBe(2);
  });
});