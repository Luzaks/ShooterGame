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
         this.load.image('menuHighButton', './assets/buttons/btnMenuPlain.png');
         this.load.image('menuHighButtonHover', './assets/buttons/btnMenuHover.png');
         this.load.image('retryBtnHover', './assets/buttons/btnRetryHover.png');
         this.load.image('retryBtnPlain', './assets/buttons/btnRetryPlain.png');

         this.load.audio('buttonSound', './assets/buttons/buttonEffect.wav');
         this.load.audio('buttonPressed', './assets/buttons/press.wav');
         this.load.audio('highScore', './assets//leaderBoard/Hi-Score.ogg');

     }

     create() {

         this.add.image(0, 0, 'highBack').setOrigin(0, 0);
         this.music = this.sound.add('highScore');
         this.music.play();
         this.hovering = this.sound.add('buttonSound');
         this.press = this.sound.add( 'buttonPressed');

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

         let menuBtnCommand = this.add.image(95, 460, 'menuHighButton').setOrigin(0, 0);
         let hoverMenuBtnCommand = this.add.image(95, 460, 'menuHighButtonHover').setOrigin(0, 0);
         hoverMenuBtnCommand.setVisible(false);

         let retryButton = this.add.image( 495, 460, 'retryBtnPlain').setOrigin(0, 0);
         let retryButtonHover = this.add.image( 495, 460, 'retryBtnHover').setOrigin(0, 0);
         retryButtonHover.setVisible(false);

         menuBtnCommand.setInteractive();
         menuBtnCommand.on('pointerup', () =>{
             this.press.play();
             this.scene.start('MainMenu');
         }) ;
         menuBtnCommand.on('pointerover', () =>{
             hoverMenuBtnCommand.setVisible(true);
             this.hovering.play();
         });
         menuBtnCommand.on('pointerout', () =>{
             hoverMenuBtnCommand.setVisible(false);
         });

         retryButton.setInteractive();
         retryButton.on('pointerup', () =>{
             this.press.play();
             this.scene.start('mainGameScene');
         }) ;
         retryButton.on('pointerover', () =>{
             retryButtonHover.setVisible(true);
             this.hovering.play();
         });
         retryButton.on('pointerout', () =>{
             retryButtonHover.setVisible(false);
         });
     }
     update()  {
     }
 }