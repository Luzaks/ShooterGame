/* eslint-disable no-undef */

export default class CommandsScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'commandsScene',
    });
  }

  preload() {
    this.load.image('commandsBack', './assets/commandsScene/blueBack.png');

    this.load.image('movesKey', './assets/commandsScene/unnamed.png');
    this.load.image('spaceKey', './assets/commandsScene/space.png');
    this.load.image('playButtonIntro', './assets/buttons/btnPlayPlain.png');
    this.load.image('playButtonIntroHover', './assets/buttons/btnPlayHover.png');
    this.load.image('menuIntroButton', './assets/buttons/btnMenuPlain.png');
    this.load.image('menuIntroButtonHover', './assets/buttons/btnMenuHover.png');

    this.load.audio('buttonSound', './assets/buttons/buttonEffect.wav');
    this.load.audio('buttonPressed', './assets/buttons/press.wav');
  }

  create() {
    this.add.image(0, 0, 'commandsBack').setOrigin(0, 0).setDepth(0);
    this.add.text(20, 20, 'COMMANDS AND MOVEMENTS', {
      fonFamily: 'Calibri',
      fontSize: '30px',
    }).setDepth(1);

    this.hover = this.sound.add('buttonSound');
    this.pressed = this.sound.add('buttonPressed');

    this.add.text(330, 160, 'Moving around', {
      fonFamily: 'Calibri',
      fontSize: '20px',
    }).setDepth(1);

    this.add.image(297, 200, 'movesKey').setOrigin(0, 0).setDepth(1);

    this.add.text(350, 350, 'Shooting', {
      fonFamily: 'Calibri',
      fontSize: '20px',
    }).setDepth(1);
    this.add.image(312, 390, 'spaceKey').setOrigin(0, 0).setDepth(1);


    const playButtonCommand = this.add.image(495, 460, 'playButtonIntro').setOrigin(0, 0);
    const hoverPlayButtonCommand = this.add.image(495, 460, 'playButtonIntroHover').setOrigin(0, 0);
    hoverPlayButtonCommand.setVisible(false);

    const menuButtonCommand = this.add.image(95, 460, 'menuIntroButton').setOrigin(0, 0);
    const hoverMenuButtonCommand = this.add.image(95, 460, 'menuIntroButtonHover').setOrigin(0, 0);
    hoverMenuButtonCommand.setVisible(false);

    playButtonCommand.setInteractive();
    playButtonCommand.on('pointerup', () => {
      this.pressed.play();
      this.scene.start('mainGameScene');
    });
    playButtonCommand.on('pointerover', () => {
      hoverPlayButtonCommand.setVisible(true);
      this.hover.play();
    });
    playButtonCommand.on('pointerout', () => {
      hoverPlayButtonCommand.setVisible(false);
    });

    menuButtonCommand.setInteractive();
    menuButtonCommand.on('pointerup', () => {
      this.pressed.play();
      this.scene.start('MainMenu');
    });
    menuButtonCommand.on('pointerover', () => {
      hoverMenuButtonCommand.setVisible(true);
      this.hover.play();
    });
    menuButtonCommand.on('pointerout', () => {
      hoverMenuButtonCommand.setVisible(false);
    });
  }
}

/* eslint-enable no-undef */