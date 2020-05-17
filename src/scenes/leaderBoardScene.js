import {getMaxScore} from "../ScoreSystem/storedScores";
import {obtainScores} from "../ScoreSystem/scoreAPI";

 export class LeaderBoardScene extends Phaser.Scene {
     constructor() {
         super({
             key: 'leaderBoardScene'
         })
     }

     preload() {
         this.load.image('highBack', './assets/leaderBoard/MP8glav.png');
         this.load.image('retryBtnHover', './assets/buttons/btnRetryHover.png');
         this.load.image('retryBtnPlain', './assets/buttons/btnRetryPlain.png');

         this.load.audio('buttonsPressed', './assets/buttons/press.wav');
         this.load.audio('highScore', './assets//leaderBoard/Hi-Score.ogg');

     }

     create() {

         this.add.image(0, 0, 'highBack').setOrigin(0, 0);
         this.music = this.sound.add('highScore');
         this.music.play();
         this.pressed = this.sound.add( 'buttonsPressed');

         obtainScores().then(r => {return r}).then((r) => {
             this.add.dom(40, 100, 'div', 'text-align: center; font: 35px Calibri; color: white', 'Best aerospacial engineers').setOrigin(0,0);
             this.add.dom(150, 170, 'div', 'text-align: center; font: 20px Calibri; color: white', '1').setOrigin(0,0);
             this.add.dom(350, 170, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[0].user}`).setOrigin(0,0);
             this.add.dom(550, 170, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[0].score}`).setOrigin(0,0);
             this.add.dom(150, 220, 'div', 'text-align: center; font: 20px Calibri; color: white', '2').setOrigin(0,0);
             this.add.dom(350, 220, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[1].user}`).setOrigin(0,0);
             this.add.dom(550, 220, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[1].score}`).setOrigin(0,0);
             this.add.dom(150, 270, 'div', 'text-align: center; font: 20px Calibri; color: white', '3').setOrigin(0,0);
             this.add.dom(350, 270, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[2].user}`).setOrigin(0,0);
             this.add.dom(550, 270, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[2].score}`).setOrigin(0,0);
             this.add.dom(150, 320, 'div', 'text-align: center; font: 20px Calibri; color: white', '4').setOrigin(0,0);
             this.add.dom(350, 320, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[3].user}`).setOrigin(0,0);
             this.add.dom(550, 320, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[3].score}`).setOrigin(0,0);
             this.add.dom(150, 370, 'div', 'text-align: center; font: 20px Calibri; color: white', '5').setOrigin(0,0);
             this.add.dom(350, 370, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[4].user}`).setOrigin(0,0);
             this.add.dom(550, 370, 'div', 'text-align: center; font: 20px Calibri; color: white', `${r[4].score}`).setOrigin(0,0);
         });

         let retryButton = this.add.image( 336, 440, 'retryBtnPlain').setOrigin(0, 0);
         let retryButtonHover = this.add.image( 336, 438, 'retryBtnHover').setOrigin(0, 0);
         retryButtonHover.setVisible(false);

         retryButton.setInteractive();
         retryButton.on('pointerup', () =>{
             this.scene.start('mainGameScene');
         }) ;
         retryButton.on('pointerover', () =>{
             retryButtonHover.setVisible(true);
             this.pressed.play();
         });
         retryButton.on('pointerout', () =>{
             retryButtonHover.setVisible(false);
         });
     }
     update()  {
     }
 }