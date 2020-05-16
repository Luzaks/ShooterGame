import {Entity} from "./Entities";
import {EnemyLaser} from './Player';

export class GunShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'sprEnemy0', 'GunShip');
        this.play('sprEnemy0');
        this.setData('enemyRank', 30);
        this.body.velocity.y = Phaser.Math.Between(50, 100);

        //event for shooting
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function() {
                const laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y
                );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }
    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
}