async function newGame() {
  const gameName = { name: 'Adhara Space' };
  const postBody = JSON.stringify(gameName);
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const APIActions = { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: postBody };
  const submittedPromise = await fetch(url, APIActions);
  // eslint-disable-next-line no-return-await
  return await submittedPromise.json();
}

async function submitHighScore(userName, scoreValue) {
  // eslint-disable-next-line radix
  const scoreObjectValues = { user: userName, score: parseInt(scoreValue) };
  const postBody = JSON.stringify(scoreObjectValues);
  const APIActions = { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: postBody };
  const submittedPromise = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ciW36ZWmdZPUzR8AWueK/scores/',
    APIActions);
  // eslint-disable-next-line no-return-await
  return await submittedPromise.json();
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
  return sortedList.map(el => el[1]).slice(0, resultObject.result.length);
}

export {
  newGame,
  submitHighScore,
  obtainScores,
};