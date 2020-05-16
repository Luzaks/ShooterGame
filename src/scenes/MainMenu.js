export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu')
    }

    init(){
    }

    preload(){
        this.load.audio('mainMenuSong', './assets/the_rising_tide.mp3');

        this.load.image('spaceBackground', './assets/space1.jpg');
        this.load.image('playButton', './assets/sprBtnPlay.png');
        this.load.image('hoverPlayButton', './assets/sprBtnPlayHover.png');
    }

    create(){
        this.add.text(this.game.config.width * 0.5 - 45, 20, 'Main Menu').setDepth(1);
        this.add.image(0, 0, 'spaceBackground').setOrigin(0, 0).setDepth(0);

        let playButtonMainMenu = this.add.image(this.game.config.width * 0.5 - 64, this.game.config.height * 0.5, 'playButton').setOrigin(0, 0);
        let hoverPlayButtonMainMenu = this.add.image(this.game.config.width * 0.5 - 64, this.game.config.height * 0.5, 'hoverPlayButton').setOrigin(0, 0);
        hoverPlayButtonMainMenu.setVisible(false);

        this.sfx = {
            mainMenuSong: this.sound.add('mainMenuSong')
        };
        let song = this.sfx.mainMenuSong;
        song.pauseOnBlur = false;
        song.play();

        playButtonMainMenu.setInteractive();
        playButtonMainMenu.on('pointerover', () => {
            hoverPlayButtonMainMenu.setVisible(true);
        });
        playButtonMainMenu.on('pointerout', () => {
            hoverPlayButtonMainMenu.setVisible(false);
        });
        playButtonMainMenu.on('pointerup', () => {
            song.stop();
            this.scene.start('mainGameScene');
        });
    }
}