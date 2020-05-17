import {getMaxScore} from "../ScoreSystem/storedScores";
import {obtainScores} from "../ScoreSystem/scoreAPI";

 export class LeaderBoardScene extends Phaser.Scene {
     constructor() {
         super({
             key: 'leaderBoardScene'
         })
     }

     preload() {
         /*this.load.scenePlugin({
             key: 'rexuiplugin',
             url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
             sceneKey: 'rexUI'
         });*/

     }

     create() {
         obtainScores().then(r => {return r}).then((r) => {
             this.add.dom(40, 100, 'div', 'text-align: center; font: 35px Arial; color: white', 'Highest Scores').setOrigin(0,0);
             this.add.dom(150, 170, 'div', 'text-align: center; font: 20px Arial; color: white', '1').setOrigin(0,0);
             this.add.dom(350, 170, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[0].user}`).setOrigin(0,0);
             this.add.dom(550, 170, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[0].score}`).setOrigin(0,0);
             this.add.dom(150, 220, 'div', 'text-align: center; font: 20px Arial; color: white', '2').setOrigin(0,0);
             this.add.dom(350, 220, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[1].user}`).setOrigin(0,0);
             this.add.dom(550, 220, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[1].score}`).setOrigin(0,0);
             this.add.dom(150, 270, 'div', 'text-align: center; font: 20px Arial; color: white', '3').setOrigin(0,0);
             this.add.dom(350, 270, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[2].user}`).setOrigin(0,0);
             this.add.dom(550, 270, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[2].score}`).setOrigin(0,0);
             this.add.dom(150, 320, 'div', 'text-align: center; font: 20px Arial; color: white', '4').setOrigin(0,0);
             this.add.dom(350, 320, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[3].user}`).setOrigin(0,0);
             this.add.dom(550, 320, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[3].score}`).setOrigin(0,0);
             this.add.dom(150, 370, 'div', 'text-align: center; font: 20px Arial; color: white', '5').setOrigin(0,0);
             this.add.dom(350, 370, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[4].user}`).setOrigin(0,0);
             this.add.dom(550, 370, 'div', 'text-align: center; font: 20px Arial; color: white', `${r[4].score}`).setOrigin(0,0);
         });
     }
     update()  {
     }
 }