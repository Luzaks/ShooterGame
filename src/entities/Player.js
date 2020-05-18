import {Entity} from "./Entities";

export class Player extends Entity {
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
        if (!this.getData('isDead')){
            this.setData('score', parseInt(this.getData('score')) + parseInt(enemyRank));
        }
        //storage.storeScores(this.getData('score'));
    }

    playerLives(lives) {
        let livesSet = parseInt(lives);
        if (livesSet > 1) {
            this.setData('lives', livesSet - 1);
        } else {
            this.explode(false);
            this.onDestroy()
        }
    }

    update(){
        //velocity
        this.body.setVelocity(0, 0);
        //Position
        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

        // protagonist shooting
        if (this.getData('isShooting')) {
            if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
                this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            }
            else { // when the "manual timer" is triggered:
                let laser = new PlayerLaser(this.scene, this.x, this.y);
                this.scene.playerLasers.add(laser);

                this.scene.sfx.laser.play(); // play the laser sound effect
                this.setData('timerShootTick', 0);
            }
        }
    }

}

export class PlayerLaser extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'sprLaserPlayer');
        this.body.velocity.y = -200;
    }
}

export class EnemyLaser extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'sprLaserEnemy0');
        this.body.velocity.y = 200;
    }
}