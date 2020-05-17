import 'phaser';
import {LoaderScene} from "./scenes/LoaderScene"
import {MainMenuScene} from"./scenes/MainMenu"
import {MainGameScene} from "./scenes/mainGameScene";
import {GameOverScene} from "./scenes/gameOver";
import {LeaderBoardScene} from "./scenes/leaderBoardScene";
import{IntroScene} from "./scenes/introScene"
import {CommandsScene} from "./scenes/commandsScene";

const config = {
    type: Phaser.canvas,
    width: 800,
    height: 600,
    backgroundColor: 'white',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [
        /*LoaderScene,
        MainMenuScene,
        IntroScene,
        CommandsScene,
        MainGameScene,*/
        GameOverScene,
        LeaderBoardScene
    ],
    pixelArt: true,
    roundPixels: true,
    parent: bodyId,
    dom: {
        createContainer: true
    },
};

const game = new Phaser.Game(config);