import {Player} from '../entities/Player'
import {ChaserShip} from '../entities/ChaserShip';
import {GunShip} from '../entities/GunShip';
import {CarrierShip} from '../entities/CarrierShip'

export class MainGameScene extends Phaser.Scene {
    constructor() {
        super('mainGameScene')
    }

    init(){
    }

    preload(){
        this.load.audio('gamePlaySong','./assets/gamePlay.wav');

        this.load.spritesheet('sprExplosion', './assets/explosion.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image('sprEnemy0', './assets/laserEnemy.png');
        this.load.image('sprEnemy1', './assets/gunEnemy.png');
        this.load.image('sprEnemy2', "./assets/plasma2.png");
        this.load.image('sprLaserEnemy0', './assets/lazer.png');
        this.load.image('sprLaserPlayer', './assets/bullet.png');
        this.load.image('sprPlayer', './assets/startShip.png');

        this.load.audio('sndExplode0', './assets/sndExplode0.wav');
        this.load.audio('sndExplode1', './assets/sndExplode1.wav');
        this.load.audio('sndLaser', './assets/sndLaser.wav');

    }

    create(){

        //Presentations
        //Header
        this.add.text(this.game.config.width * 0.5 - 45, 20, 'Game').setDepth(1);
        //Score

        //Gameplay sound
        this.song = this.sound.add('gamePlaySong', { volume: 0.1 });
        this.song.play();

        //Create sprite animations
        this.anims.create({
            key: 'sprExplosion',
            frames: this.anims.generateFrameNumbers('sprExplosion'),
            frameRate: 20,
            repeat: 0
        });

        //Create sounds
        this.sfx = {
            explosions: [
                this.sound.add("sndExplode0"),
                this.sound.add("sndExplode1")
            ],
            laser: this.sound.add("sndLaser")
        };

        //Create a new instance of player protagonist
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprPlayer"
        );

        //Add mobility
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //load enemies
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();


        //event for displaying enemies
        this.time.addEvent({
            delay: 1000,
            callback: function() {
                let enemy = null;

                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GunShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }
                else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType("ChaserShip").length < 5) {
                        enemy = new ChaserShip(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0
                        );
                    }
                }
                else {
                    enemy = new CarrierShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }

                if (enemy !== null) {
                    enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

        //killing enemies
        this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                }
                enemy.explode(true);
                playerLaser.destroy();
            }
        });

        this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
            if (!player.getData('isDead') &&
                !enemy.getData('isDead')) {
                player.explode(false);
                enemy.explode(true);
                player.onDestroy();
            }
        });

        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if (!player.getData('isDead') &&
                !laser.getData('isDead')) {
                player.explode(false);
                laser.destroy();
                player.onDestroy();
            }
        });

    }

    getEnemiesByType(type) {
        let arr = [];
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            let enemy = this.enemies.getChildren()[i];
            if (enemy.getData('type') === type) {
                arr.push(enemy);
            }
        }
        return arr;
    }

    update(){

        //Update player position
        if (!this.player.getData('isDead')) {
            this.player.update();

            if (this.keyW.isDown) {
                this.player.moveUp();
            }
            else if (this.keyS.isDown) {
                this.player.moveDown();
            }
            if (this.keyA.isDown) {
                this.player.moveLeft();
            }
            else if (this.keyD.isDown) {
                this.player.moveRight();
            }

            if (this.keySpace.isDown) {
                this.player.setData('isShooting', true);
            }
            else {
                this.player.setData('timerShootTick', this.player.getData("timerShootDelay") - 1);
                this.player.setData('isShooting', false);
            }
        }

        //Displaying enemies

        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            let enemy = this.enemies.getChildren()[i];

            enemy.update();

            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {

                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }

                    enemy.destroy();
                }
            }
        }
        for (let i = 0; i < this.enemyLasers.getChildren().length; i++) {
            let laser = this.enemyLasers.getChildren()[i];
            laser.update();

            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }

        for (let i = 0; i < this.playerLasers.getChildren().length; i++) {
            let laser = this.playerLasers.getChildren()[i];
            laser.update();

            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
    }
}
