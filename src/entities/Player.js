/* eslint-disable no-undef */

import Entity from './Entities';
import PlayerLaser from './PlayerLaser';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.setData('speed', 200);

    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
    this.setData('score', 0);
    this.setData('lives', 3);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.scene.scene.start('gameOver');
      },
      callbackScope: this,
      loop: false,
    });
  }

  playerScore(enemyRank) {
    if (!this.getData('isDead')) {
      // eslint-disable-next-line radix
      this.setData('score', parseInt(this.getData('score')) + parseInt(enemyRank));
    }
  }

  playerLives(lives) {
    // eslint-disable-next-line radix
    const livesSet = parseInt(lives);
    if (livesSet > 1) {
      this.setData('lives', livesSet - 1);
    } else {
      this.explode(false);
      this.onDestroy();
    }
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play();
        this.setData('timerShootTick', 0);
      }
    }
  }
}

/* eslint-enable no-undef */