export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu')
    }

    init(){
    }

    preload(){

        this.load.audio('mainMenuSong', './assets/mainMenu/the_rising_tide.mp3');
        this.load.audio('buttonSound', './assets/buttons/buttonEffect.wav');
        this.load.audio('buttonPressed', './assets/buttons/press.wav');

        this.load.image('spaceBackground', './assets/mainMenu/space1.jpg');
        this.load.image('logoGame', '/assets/mainMenu/mainGameLogo.png');
        this.load.image('playButton', './assets/buttons/btnPlayPlain.png');
        this.load.image('hoverPlayButton', './assets/buttons/btnPlayHover.png');
        this.load.image('introButton', './assets/buttons/btnIntroPlain.png');
        this.load.image('hoverIntroButton', './assets/buttons/btnIntroHover.png');
        this.load.image('commandsButton', './assets/buttons/btnCommandsPlain.png');
        this.load.image('hoverCommandsButton', './assets/buttons/btnCommandsHover.png');
        this.load.image('rankButton', './assets/buttons/btnRankingPlain.png');
        this.load.image('hoverRankButton', './assets/buttons/btnRankingHover.png');
    }

    create(){

        this.add.image(0, 0, 'spaceBackground').setOrigin(0, 0).setDepth(0);
        this.add.image(58, 25, 'logoGame').setOrigin(0, 0).setDepth(1);

        let playButtonMainMenu = this.add.image(293, 205, 'playButton').setOrigin(0, 0);
        let hoverPlayButtonMainMenu = this.add.image(293, 206, 'hoverPlayButton').setOrigin(0, 0);
        hoverPlayButtonMainMenu.setVisible(false);

        let introButtonMainMenu = this.add.image(293, 305, 'introButton').setOrigin(0, 0);
        let hoverIntroButtonMainMenu = this.add.image(293, 305, 'hoverIntroButton').setOrigin(0, 0);
        hoverIntroButtonMainMenu.setVisible(false);

        let commandsButtonMainMenu = this.add.image(293, 405, 'commandsButton').setOrigin(0, 0);
        let hoverCommandsButtonMainMenu = this.add.image(293, 405, 'hoverCommandsButton').setOrigin(0, 0);
        hoverCommandsButtonMainMenu.setVisible(false);

        let rankingButtonMainMenu = this.add.image(293, 505, 'rankButton').setOrigin(0, 0);
        let hoverRankingButtonMainMenu = this.add.image(293, 505, 'hoverRankButton').setOrigin(0, 0);
        hoverRankingButtonMainMenu.setVisible(false);

        this.sfx = {
            mainMenuSong: this.sound.add('mainMenuSong'),
            playBtnSound: this.sound.add('buttonSound'),
            pressBtnSound: this.sound.add('buttonPressed'),
        };

        let song = this.sfx.mainMenuSong;
        song.pauseOnBlur = false;
        song.play();

        playButtonMainMenu.setInteractive();
        playButtonMainMenu.on('pointerover', () => {
            this.sfx.playBtnSound.play();
            hoverPlayButtonMainMenu.setVisible(true);
        });
        playButtonMainMenu.on('pointerout', () => {
            hoverPlayButtonMainMenu.setVisible(false);
        });
        playButtonMainMenu.on('pointerup', () => {
            this.sfx.pressBtnSound.play();
            song.stop();
            this.scene.start('mainGameScene');
        });

        introButtonMainMenu.setInteractive();
        introButtonMainMenu.on('pointerover', () => {
            this.sfx.playBtnSound.play();
            hoverIntroButtonMainMenu.setVisible(true);
        });
        introButtonMainMenu.on('pointerout', () => {
            hoverIntroButtonMainMenu.setVisible(false);
        });
        introButtonMainMenu.on('pointerup', () => {
            this.sfx.pressBtnSound.play();
            song.stop();
            this.scene.start('introScene');
        });

        commandsButtonMainMenu.setInteractive();
        commandsButtonMainMenu.on('pointerover', () => {
            this.sfx.playBtnSound.play();
            hoverCommandsButtonMainMenu.setVisible(true);
        });
        commandsButtonMainMenu.on('pointerout', () => {
            hoverCommandsButtonMainMenu.setVisible(false);
        });
        commandsButtonMainMenu.on('pointerup', () => {
            this.sfx.pressBtnSound.play();
            song.stop();
            this.scene.start('commandsScene');
        });

        rankingButtonMainMenu.setInteractive();
        rankingButtonMainMenu.on('pointerover', () => {
            this.sfx.playBtnSound.play();
            hoverRankingButtonMainMenu.setVisible(true);
        });
        rankingButtonMainMenu.on('pointerout', () => {
            hoverRankingButtonMainMenu.setVisible(false);
        });
        rankingButtonMainMenu.on('pointerup', () => {
            this.sfx.pressBtnSound.play();
            song.stop();
            this.scene.start('leaderBoardScene');
        });

    }
}