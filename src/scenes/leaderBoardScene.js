import {getMaxScore} from "../ScoreSystem/storedScores";
import {obtainScores} from "../ScoreSystem/scoreAPI";

 export class LeaderBoardScene extends Phaser.Scene {
     constructor() {
         super({
             key: 'examples'
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

         this.add.dom(40, 100, 'div', 'text-align: center; font: 35px Arial; color: white', 'Highest Scores').setOrigin(0,0);
         this.add.dom(150, 170, 'div', 'text-align: center; font: 20px Arial; color: white', 'Top Number').setOrigin(0,0);
         this.add.dom(350, 170, 'div', 'text-align: center; font: 20px Arial; color: white', `planerName`).setOrigin(0,0);
         this.add.dom(550, 170, 'div', 'text-align: center; font: 20px Arial; color: white', `${getMaxScore()}`).setOrigin(0,0);
         obtainScores();

     }
     update()  {
     }
 }