import * as storage from '../ScoreSystem/storedScores';
import * as leaderBoardData from '../scoreSystem/scoreAPI';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    preload() {
        this.load.audio('gameOver', './assets/no_hope.wav');
        this.load.image('submitBtn', './assets/sprBtnRestart.png')
    }

    create() {
        this.title = this.add.text(this.game.config.width * 0.5, 128, 'You are dead!', {
            align: 'center',
        });

        this.title.setOrigin(0.5, 0.8);

        this.music = this.sound.add('gameOver');
        this.music.pauseOnBlur = false;
        this.music.play();

        let submitButton = this.add.image(this.game.config.width * 0.5 - 64, this.game.config.height * 0.5, 'submitBtn').setOrigin(0, 0);
        submitButton.setInteractive();
        submitButton.on('pointerup', () => {
            /*let submitYourScore = leaderBoardData.submitHighScore('Lain', storage.getMaxScore()).then((r) => {return r}).then((r) => {return r});*/
            let getScores = leaderBoardData.obtainScores().then((r) => {return r}).then((r) => {return r});
            console.log(getScores);
        });

        submitButton.on('pointerover', () => {
           console.log('Hi am over retry button');
        });
    }

    update() {
    }
}