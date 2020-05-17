export class CommandsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'commandsScene' });
    }
    init(){

    }

    preload() {

    }

    create() {
        this.add.text(this.game.config.width * 0.5 - 45, 20, 'commands scene').setDepth(1);
    }

    update() {
    }
}