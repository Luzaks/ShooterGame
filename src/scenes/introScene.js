export class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'introScene' });
    }
    init(){

    }

    preload() {

    }

    create() {
        this.add.text(this.game.config.width * 0.5 - 45, 20, 'Intro Scene').setDepth(1);

    }

    update() {
    }
}