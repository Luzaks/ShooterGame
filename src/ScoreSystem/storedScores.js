let scoresContainer = JSON.parse(localStorage.getItem('scores'));

const localStoreScore = (score) => {
    localStorage.setItem('scores',JSON.stringify(score));
};

const pushingScoresContainer = () => {
    if (scoresContainer === null) {
        scoresContainer = [0];
        localStoreScore(scoresContainer);
    }
    return scoresContainer;
};

const storeScores = (score) => {
    const localScore = pushingScoresContainer();
    if (score > localScore[0]){
        localScore[0] = score;
    }
    localStoreScore(localScore);
};

const getMaxScore = () => {
    return Math.max(...scoresContainer);
};

const getCurrentScore = (playerScore) => {
    return playerScore;
};

export { localStoreScore, pushingScoresContainer, storeScores, getMaxScore, getCurrentScore };