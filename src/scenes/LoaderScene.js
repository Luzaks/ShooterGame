/* eslint-disable no-undef */
import Phaser from 'phaser';

export default class LoaderScene extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('play_button', '../assets/PlayButton.png');

    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 10);
    });

    this.load.on('complete', () => {

    });
  }

  create() {
    this.add.text(20, 20, 'Loading...');
    this.scene.start('MainMenu');
  }
}

/* eslint-enable no-undef */
