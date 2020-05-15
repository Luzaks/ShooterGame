export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    preload() {
        this.load.audio('gameOver', './assets/no_hope.wav');
    }

    create() {
        this.title = this.add.text(this.game.config.width * 0.5, 128, 'You are dead!', {
            align: 'center',
        });

        this.title.setOrigin(0.5, 0.8);

        this.music = this.sound.add('gameOver');
        this.music.play();
    }

    update() {
    }
}