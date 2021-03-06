let scoresContainer = JSON.parse(localStorage.getItem('scores'));

const localStoreScore = (scores) => {
  localStorage.setItem('scores', JSON.stringify(scores));
};

const pushingScoresContainer = () => {
  if (scoresContainer === null) {
    scoresContainer = [0, 0];
    localStoreScore(scoresContainer);
  }
  return scoresContainer;
};

const storeScores = (score) => {
  const localScore = pushingScoresContainer();
  if (score > localScore[0]) {
    localScore[0] = score;
  }
  localScore[1] = score;
  localStoreScore(localScore);
};

const getMaxScore = () => {
  if (scoresContainer === null) {
    return 0;
  }
  return scoresContainer[0];
};

const getCurrentScore = () => {
  if (scoresContainer === null) {
    return 0;
  }
  return scoresContainer[1];
};

const scoresContainerFunction = () => scoresContainer;

export {
  scoresContainerFunction,
  localStoreScore,
  pushingScoresContainer,
  storeScores,
  getMaxScore,
  getCurrentScore,
};