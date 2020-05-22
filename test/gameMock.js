import LoaderScene from '../src/scenes/LoaderScene';
import MainMenuScene from '../src/scenes/MainMenu';
import MainGameScene from '../src/scenes/mainGameScene';
import GameOverScene from '../src/scenes/gameOver';
import LeaderBoardScene from '../src/scenes/leaderBoardScene';
import IntroScene from '../src/scenes/introScene';
import CommandsScene from '../src/scenes/commandsScene';

const gameMocked = () => {
  const config = {
    // eslint-disable-next-line no-undef
    type: Phaser.canvas,
    width: 800,
    height: 600,
    backgroundColor: 'white',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
      },
    },
    scene: [
      LoaderScene,
      MainMenuScene,
      IntroScene,
      CommandsScene,
      MainGameScene,
      GameOverScene,
      LeaderBoardScene,
    ],
    pixelArt: true,
    roundPixels: true,
    dom: {
      createContainer: true,
    },
  };
  // eslint-disable-next-line no-undef
  return new Phaser.Game(config);
};
export default gameMocked;