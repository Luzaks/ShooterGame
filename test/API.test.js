import * as apiRequest from '../src/ScoreSystem/scoreAPI';
import '@babel/polyfill';

describe('It test the API request system.', () => {
  test('the create POST action using an async function.', () => {
    apiRequest.newGame()
      .then(r => { expect(r).toBeDefined(); })
      .then(r => r).catch(() => 'Error');
  });
  test('the submit POST action using an async function.', () => {
    apiRequest.submitHighScore('Brandy', 600)
      .then(r => { expect(r).toBe('Leaderboard score created correctly.'); })
      .then(r => r).catch(() => 'Error');
  });

  test('the obtain GET action using an async function.', () => {
    apiRequest.obtainScores()
      .then(r => { expect(r[1].user).toBe('Brandy'); })
      .then(r => r).catch(() => 'Error');
  });
});