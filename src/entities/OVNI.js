import {Entity} from "./Entities";
import {EnemyPlasma} from './Player';

export class OVNI extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'sprEnemy4', 'ovniShip');
        this.play('sprEnemy4');
        this.setData('enemyRank', 10);
        this.body.velocity.y = Phaser.Math.Between(50, 100);

        //event for shooting
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function() {
                const laser = new EnemyPlasma(
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