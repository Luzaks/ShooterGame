/* eslint-disable no-undef */

import Player from '../entities/Player';
import InterStellarShip from '../entities/InterStellarShip';
import AttackShip from '../entities/AttackShip';
import Gravity from '../entities/Gravity';
import AntiParticle from '../entities/antiParticle';
import OVNI from '../entities/OVNI';
import ScrollingBackground from './scrollingBackground';
import * as storage from '../ScoreSystem/storedScores';

export default class MainGameScene extends Phaser.Scene {
  constructor() {
    super('mainGameScene');
  }

  preload() {
    this.load.plugin('rexlifetimeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlifetimeplugin.min.js', true);

    this.load.audio('gamePlaySong', './assets/gamePlay/the_fallen.mp3');
    this.load.audio('collisionSound', './assets/gamePlay/FX091.wav');


    this.load.spritesheet('sprExplosion', './assets/gamePlay/explosion.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprBg0', './assets/gamePlay/try2.png');
    this.load.image('sprEnemy0', './assets/gamePlay/laserEnemy.png');
    this.load.image('sprEnemy1', './assets/gamePlay/gunEnemy.png');
    this.load.image('sprEnemy2', './assets/gamePlay/plasma2.png');
    this.load.image('sprEnemy3', './assets/gamePlay/MagiBlaster.png');
    this.load.image('sprEnemy4', './assets/gamePlay/moroder.png');
    this.load.image('sprLaserEnemy0', './assets/gamePlay/lazer.png');
    this.load.image('sprLaserEnemy1', './assets/gamePlay/Laser01.png');
    this.load.image('sprLaserPlayer', './assets/gamePlay/bullet.png');
    this.load.image('sprPlayer', './assets/gamePlay/startShip.png');

    this.load.audio('sndExplode0', './assets/gamePlay/sndExplode0.wav');
    this.load.audio('sndExplode1', './assets/gamePlay/sndExplode1.wav');
    this.load.audio('sndLaser', './assets/gamePlay/sndLaser.wav');
  }

  create() {
    const scoreBoardStyle = 'font: 16px Calibri; font-weight: 900; color: white';
    const scoreBoard = this.add.dom(16, 16, 'h2', `${scoreBoardStyle}`, 'SCORE: 0').setOrigin(0, 0).setDepth(1);

    this.add.dom(584, 16, 'h2', `${scoreBoardStyle}`, `HIGHEST SCORE: ${storage.getMaxScore()}`).setOrigin(0, 0).setDepth(1);

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
      gamePlaySong: this.sound.add('gamePlaySong', { loop: true }),
      collisionSound: this.sound.add('collisionSound'),
    };

    const song = this.sfx.gamePlaySong;
    song.pauseOnBlur = false;
    song.play();

    const { collisionSound } = this.sfx;

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );
    const playerNew = this.player;
    const livesBoard = this.add.dom(325, 16, 'h2', `${scoreBoardStyle}`, `LIVES: ${playerNew.getData('lives')}`).setOrigin(0, 0).setDepth(1);

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;
        let secondEnemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new AttackShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          secondEnemy = new OVNI(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new InterStellarShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
            this.enemies.add(enemy);
          }
        } else {
          enemy = new Gravity(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          secondEnemy = new AntiParticle(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }
        if (enemy !== null && secondEnemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
          secondEnemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(secondEnemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        playerNew.playerScore(`${enemy.getData('enemyRank')}`);
        scoreBoard.setText(`SCORE: ${playerNew.getData('score')}`);
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
                && !enemy.getData('isDead')) {
        player.explode(false);
        enemy.explode(true);
        player.onDestroy();
        storage.storeScores(player.getData('score'));
        song.stop();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
                && !laser.getData('isDead')) {
        if (player.getData('lives') >= 1) {
          collisionSound.play();
        }
        laser.destroy();
        playerNew.playerLives(`${player.getData('lives')}`);
        livesBoard.setText(`LIVES: ${playerNew.getData('lives')}`);
      } else {
        song.stop();
      }
      storage.storeScores(player.getData('score'));
      storage.getCurrentScore(player.getData('score'));
    });
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }

    if (!this.player.getData('isDead')) {
      this.player.update();

      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
                || enemy.x > this.game.config.width + enemy.displayWidth
                || enemy.y < -enemy.displayHeight * 4
                || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }
    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
                || laser.x > this.game.config.width + laser.displayWidth
                || laser.y < -laser.displayHeight * 4
                || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
                || laser.x > this.game.config.width + laser.displayWidth
                || laser.y < -laser.displayHeight * 4
                || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}

/* eslint-enable no-undef */
