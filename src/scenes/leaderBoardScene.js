// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import { obtainScores } from '../ScoreSystem/scoreAPI';

// eslint-disable-next-line no-undef
export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'leaderBoardScene',
    });
  }

  preload() {
    this.load.image('highBack', './assets/leaderBoard/MP8glav.png');
    this.load.image('menuHighButton', './assets/buttons/btnMenuPlain.png');
    this.load.image('menuHighButtonHover', './assets/buttons/btnMenuHover.png');
    this.load.image('retryBtnHover', './assets/buttons/btnRetryHover.png');
    this.load.image('retryBtnPlain', './assets/buttons/btnRetryPlain.png');

    this.load.audio('buttonSound', './assets/buttons/buttonEffect.wav');
    this.load.audio('buttonPressed', './assets/buttons/press.wav');
    this.load.audio('highScore', './assets//leaderBoard/Hi-Score.ogg');
  }

  create() {
    this.add.image(0, 0, 'highBack').setOrigin(0, 0);
    this.music = this.sound.add('highScore');
    this.music.play();
    this.hovering = this.sound.add('buttonSound');
    this.press = this.sound.add('buttonPressed');

    obtainScores().then((r) => {
      this.add.dom(125, 60, 'div', 'text-align: center; font: 35px Calibri; color: white', 'Best aerospacial engineers').setOrigin(0, 0);

      const DataStyle = 'font: 23px Calibri; color: white; width: 250px; height: 40px; font-weight: 700;';
      let j = 170;

      for (let i = 0; i < 5; i += 1) {
        this.add.dom(125, j, 'div', `${DataStyle}`, `${i + 1}.-  ${r[i][1].user}  ${r[i][1].score}`).setOrigin(0, 0);
        this.add.dom(525, j, 'div', `${DataStyle}`, `${i + 6}.-  ${r[i + 5][1].user}  ${r[i + 5][1].score}`).setOrigin(0, 0);
        j += 40;
      }
    });

    const menuBtnCommand = this.add.image(95, 460, 'menuHighButton').setOrigin(0, 0);
    const hoverMenuBtnCommand = this.add.image(95, 460, 'menuHighButtonHover').setOrigin(0, 0);
    hoverMenuBtnCommand.setVisible(false);

    const retryButton = this.add.image(495, 460, 'retryBtnPlain').setOrigin(0, 0);
    const retryButtonHover = this.add.image(495, 460, 'retryBtnHover').setOrigin(0, 0);
    retryButtonHover.setVisible(false);

    menuBtnCommand.setInteractive();
    menuBtnCommand.on('pointerup', () => {
      this.press.play();
      this.scene.start('MainMenu');
    });
    menuBtnCommand.on('pointerover', () => {
      hoverMenuBtnCommand.setVisible(true);
      this.hovering.play();
    });
    menuBtnCommand.on('pointerout', () => {
      hoverMenuBtnCommand.setVisible(false);
    });

    retryButton.setInteractive();
    retryButton.on('pointerup', () => {
      this.press.play();
      this.scene.start('mainGameScene');
    });
    retryButton.on('pointerover', () => {
      retryButtonHover.setVisible(true);
      this.hovering.play();
    });
    retryButton.on('pointerout', () => {
      retryButtonHover.setVisible(false);
    });
  }
}