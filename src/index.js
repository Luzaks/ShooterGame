import 'phaser';
import {LoaderScene} from "./scenes/LoaderScene"
import {MainMenuScene} from"./scenes/MainMenu"


const config = {
    width: 800,
    height: 600,
    backgroundColor: "black",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [
        LoaderScene,
        MainMenuScene
    ],
    pixelArt: true,
    roundPixels: true
};

const game = new Phaser.Game(config);