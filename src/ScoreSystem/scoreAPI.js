async function newGame() {
    const gameName = { name: 'Adhara Space' };
    const postBody = JSON.stringify(gameName);
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    const APIActions = { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json'}, body: postBody };
    const submittedPromise = await fetch(url, APIActions);
    return await submittedPromise.json()
}

const gameID = 'ciW36ZWmdZPUzR8AWueK';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;

async function submitHighScore(userName, scoreValue) {
    const scoreObjectValues = { user: userName, score: scoreValue};
    const postBody = JSON.stringify(scoreObjectValues);
    const APIActions = { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: postBody };
    const submittedPromise = await fetch(url, APIActions);
    return await submittedPromise.json();
}

async function obtainScores() {
    const APIActions = { method: 'GET', headers: { Accept: 'application/json',  'Content-Type': 'application/json' }};
    const submittedPromise = await fetch(url, APIActions);
    const resultObject = await submittedPromise.json();

    let sortedList = [];
    sortedList = Object.entries(resultObject.result).sort((a ,b) => {
        if (b[1].score > a[1].score) return 1;
            else if (b[1].score < a[1].score) return -1;
                else return 0;

    });
    return sortedList.map(el => el[1]).slice(0, resultObject.result.length);
}

export {
    submitHighScore,
    obtainScores
}