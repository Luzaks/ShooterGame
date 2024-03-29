/* eslint-disable no-undef */

import Entity from './Entities';

export default class InterStellarShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'ChaserShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.setData('enemyRank', 20);
  }
}

/* eslint-enable no-undef */