// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';

async function newGame() {
  const gameName = { name: 'Adhara Space' };
  const postBody = JSON.stringify(gameName);
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const APIActions = { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: postBody };
  const submittedPromise = await fetch(url, APIActions);
  const returnedResponse = await submittedPromise.json();
  return returnedResponse;
}

async function submitHighScore(userName, scoreValue) {
  const scoreObjectValues = { user: userName, score: parseInt(scoreValue, 10) };
  const postBody = JSON.stringify(scoreObjectValues);
  const APIActions = { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: postBody };
  const submittedPromise = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ciW36ZWmdZPUzR8AWueK/scores/',
    APIActions);
  const returnedResponse = await submittedPromise.json();
  return returnedResponse;
}

async function obtainScores() {
  const APIActions = { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json' } };
  const submittedPromise = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ciW36ZWmdZPUzR8AWueK/scores/',
    APIActions);
  const resultObject = await submittedPromise.json();

  let sortedList = [];
  sortedList = Object.entries(resultObject.result).sort((a, b) => {
    if (b[1].score > a[1].score) return 1;
    if (b[1].score < a[1].score) return -1;
    return 0;
  });
  return sortedList;
}

export {
  newGame,
  submitHighScore,
  obtainScores,
};