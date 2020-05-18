import Entity from './Entities';

export default class EnemyPlasma extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserEnemy1');
    this.body.velocity.y = 150;
  }
}