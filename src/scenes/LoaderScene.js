export class LoaderScene extends Phaser.Scene {

    constructor() {
        super('bootGame');
    }
    init(){

    }
    preload(){
        //change screen resolution

        //load image and sound
        this.load.image('play_button', '../assets/PlayButton.png')
        //create loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        });
        //Load events

        this.load.on('progress', (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height  / 2, this.game.renderer.width * percent, 10 );
        });

        this.load.on('complete', () => {
            //this.scene.start('mainGameScene');
        });
    }

    create() {
        this.add.text(20, 20, 'Loading...');
        this.scene.start('MainMenu');
    }
}