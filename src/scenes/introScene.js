/* eslint-disable no-undef */

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'introScene' });
  }

  preload() {
    this.load.image('introBack', './assets/introScene/gusano.png');
    this.load.image('playButton', './assets/buttons/btnPlayPlain.png');
    this.load.image('playButtonHover', './assets/buttons/btnPlayHover.png');
    this.load.image('menuButton', './assets/buttons/btnMenuPlain.png');
    this.load.image('menuButtonHover', './assets/buttons/btnMenuHover.png');

    this.load.audio('buttonSound', './assets/buttons/buttonEffect.wav');
    this.load.audio('buttonPressed', './assets/buttons/press.wav');
  }

  create() {
    this.hover = this.sound.add('buttonSound');
    this.pressed = this.sound.add('buttonPressed');

    this.add.text(20, 20, 'INTRO', { fonFamily: 'Calibri', fontSize: '30px' }).setDepth(1);
    this.add.image(0, 0, 'introBack').setOrigin(0, 0).setDepth(0);

    const divDoom = document.createElement('div');
    divDoom.innerHTML = `
        <span> You are the only aerospace engineer in the Lynx - 08279<br>
            the spacial ship absorbed by a black hole in a recognition trip.<br>
            Try to scape of the space-time distortion if you can <br>
            but if not you always can go back in time and retry. <br>
            P.S.: Take care of yourself, other organisms are trapped with you <br>
            and you only have 3 charges of electromagnetic fields to protect you <br>
            from plasma projectiles, but not from gravity distortions <br>
            and antimatter collisions.  
        `;
    this.add.dom(35, 100, divDoom, 'text-align: center; font: 25px Calibri; color: white;').setOrigin(0, 0);

    const playButtonIntro = this.add.image(495, 440, 'playButton').setOrigin(0, 0);
    const hoverPlayButtonIntro = this.add.image(495, 440, 'playButtonHover').setOrigin(0, 0);
    hoverPlayButtonIntro.setVisible(false);

    const menuButtonIntro = this.add.image(95, 440, 'menuButton').setOrigin(0, 0);
    const hoverMenuButtonIntro = this.add.image(95, 440, 'menuButtonHover').setOrigin(0, 0);
    hoverMenuButtonIntro.setVisible(false);

    playButtonIntro.setInteractive();
    playButtonIntro.on('pointerup', () => {
      this.pressed.play();
      this.scene.start('mainGameScene');
    });
    playButtonIntro.on('pointerover', () => {
      hoverPlayButtonIntro.setVisible(true);
      this.hover.play();
    });
    playButtonIntro.on('pointerout', () => {
      hoverPlayButtonIntro.setVisible(false);
    });

    menuButtonIntro.setInteractive();
    menuButtonIntro.on('pointerup', () => {
      this.pressed.play();
      this.scene.start('MainMenu');
    });
    menuButtonIntro.on('pointerover', () => {
      hoverMenuButtonIntro.setVisible(true);
      this.hover.play();
    });
    menuButtonIntro.on('pointerout', () => {
      hoverMenuButtonIntro.setVisible(false);
    });
  }
}

/* eslint-enable no-undef */