import {Entity} from "./Entities";

export class AntiParticle extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "sprEnemy3", "AntiMatter");
        this.body.velocity.y = Phaser.Math.Between(50, 100);
        this.setData('enemyRank', 20);
    }
}