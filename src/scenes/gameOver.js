/* eslint-disable no-undef */

import * as storage from '../ScoreSystem/storedScores';
import { submitHighScore } from '../ScoreSystem/scoreAPI';
import ScrollingBackground from './scrollingBackground';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameOver' });
  }

  preload() {
    this.load.image('sprBg0', './assets/gamePlay/try2.png');
    this.load.image('submitBtnPlain', './assets/buttons/btnSubmitPlain.png');
    this.load.image('submitBtnHover', './assets/buttons/btnSubmitHover.png');
    this.load.image('gameOverTittle', './assets/gameOver/titleGameOver.png');
    this.load.image('retryBtnPlain', './assets/buttons/btnRetryPlain.png');
    this.load.image('retryBtnHover', './assets/buttons/btnRetryHover.png');
    this.load.image('rankBtnPlain', './assets/buttons/btnRankingPlain.png');
    this.load.image('rankBtnHover', './assets/buttons/btnRankingHover.png');

    this.load.audio('gameOver', './assets/no_hope.wav');
    this.load.audio('buttonsPressed', './assets/buttons/press.wav');
  }

  create() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    this.add.image(267, 16, 'gameOverTittle').setOrigin(0, 0).setDepth(0);


    this.music = this.sound.add('gameOver', {
      loop: true,
    });
    this.music.pauseOnBlur = false;
    this.music.play();

    this.pressed = this.sound.add('buttonsPressed');

    const yourScoreStyle = 'font: 28px Calibri; font-weight: 900; color: white';
    this.add.dom(365, 109, 'h2', `${yourScoreStyle}`, `Score: ${storage.getCurrentScore()}`).setOrigin(0, 0).setDepth(1);

    const inputDoomDiv = document.createElement('div');
    inputDoomDiv.innerHTML = `
            <input type="text" id="inputName" placeholder="Type your name to submit" style="width: 300px;  height: 30px; margin-bottom: 30px; padding: 3px; text-align: center; border: 1px darkcyan solid; font: 20px Calibri; font-weight: 900; background-color: transparent; color: darkcyan"><br>
         `;
    const inputEventContainerStyle = 'text-align: center';
    this.add.dom(250, 220, inputDoomDiv, `${inputEventContainerStyle}`).setOrigin(0, 0);

    const submitButton = this.add.image(293, 340, 'submitBtnPlain').setOrigin(0, 0);
    const submitButtonHover = this.add.image(293, 340, 'submitBtnHover').setOrigin(0, 0);
    submitButtonHover.setVisible(false);

    const retryButton = this.add.image(95, 440, 'retryBtnPlain').setOrigin(0, 0);
    const retryButtonHover = this.add.image(95, 440, 'retryBtnHover').setOrigin(0, 0);
    retryButtonHover.setVisible(false);

    const rankButton = this.add.image(495, 440, 'rankBtnPlain').setOrigin(0, 0);
    const rankButtonHover = this.add.image(495, 440, 'rankBtnHover').setOrigin(0, 0);
    rankButtonHover.setVisible(false);

    submitButton.setInteractive();
    submitButton.on('pointerup', () => {
      const inputNameValue = document.getElementById('inputName').value;
      const currentScore = storage.getCurrentScore();

      if (inputNameValue !== '' && currentScore > 0) {
        submitHighScore(inputNameValue, currentScore).then(r => r).then(r => r);
        this.music.stop();
        this.scene.start('leaderBoardScene');
      } else if (inputNameValue === '') {
        // eslint-disable-next-line no-alert
        alert('Input name empty');
      } else if (currentScore <= 0) {
        // eslint-disable-next-line no-alert
        alert('Your score has to be bigger than zero to be processed, play again.');
      }
    });

    submitButton.on('pointerover', () => {
      submitButtonHover.setVisible(true);
      this.pressed.play();
    });

    submitButton.on('pointerout', () => {
      submitButtonHover.setVisible(false);
    });

    retryButton.setInteractive();
    retryButton.on('pointerup', () => {
      this.music.stop();
      this.scene.start('mainGameScene');
    });
    retryButton.on('pointerover', () => {
      retryButtonHover.setVisible(true);
      this.pressed.play();
    });
    retryButton.on('pointerout', () => {
      retryButtonHover.setVisible(false);
    });

    rankButton.setInteractive();
    rankButton.on('pointerup', () => {
      this.music.stop();
      this.scene.start('leaderBoardScene');
    });
    rankButton.on('pointerover', () => {
      rankButtonHover.setVisible(true);
      this.pressed.play();
    });
    rankButton.on('pointerout', () => {
      rankButtonHover.setVisible(false);
    });
  }
}

/* eslint-enable no-undef */
