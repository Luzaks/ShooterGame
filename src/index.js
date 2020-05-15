import 'phaser';
import {LoaderScene} from "./scenes/LoaderScene"
import {MainMenuScene} from"./scenes/MainMenu"
import {MainGameScene} from "./scenes/mainGameScene";
import {GameOverScene} from "./scenes/gameOver";

const config = {
    type: Phaser.canvas,
    width: 800,
    height: 600,
    backgroundColor: 'black',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [
        LoaderScene,
        MainMenuScene,
        MainGameScene,
        GameOverScene
    ],
    pixelArt: true,
    roundPixels: true
};

const game = new Phaser.Game(config);