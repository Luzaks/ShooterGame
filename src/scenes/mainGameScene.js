import {Player} from '../entities/Player'
import {ChaserShip} from '../entities/ChaserShip';
import {GunShip} from '../entities/GunShip';
import {CarrierShip} from '../entities/CarrierShip';
import * as storage from '../ScoreSystem/storedScores';
import * as leaderBoardData from '../ScoreSystem/scoreAPI';

export class MainGameScene extends Phaser.Scene {

    constructor() {
        super('mainGameScene')
    }
    init(){
    }

    preload(){
        this.load.plugin('rexlifetimeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlifetimeplugin.min.js', true);

        this.load.audio('gamePlaySong','./assets/the_fallen.mp3');
        this.load.audio('collisionSound','./assets/gamePlay/FX091.wav');


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
        const scoreBoardStyle = 'font: 16px Calibri; font-weight: 900; color: white';
        const scoreBoard = this.add.dom(16, 16, 'h2', `${scoreBoardStyle}`, 'SCORE: 0').setOrigin(0, 0).setDepth(1);

        this.add.dom(584, 16, 'h2', `${scoreBoardStyle}`, `HIGHEST SCORE: ${storage.getMaxScore()}`).setOrigin(0, 0).setDepth(1);

        this.anims.create({
            key: 'sprExplosion',
            frames: this.anims.generateFrameNumbers('sprExplosion'),
            frameRate: 20,
            repeat: 0
        });

        this.sfx = {
            explosions: [
                this.sound.add('sndExplode0'),
                this.sound.add('sndExplode1')
            ],
            laser: this.sound.add('sndLaser'),
            gamePlaySong: this.sound.add('gamePlaySong'),
            collisionSound: this.sound.add('collisionSound')
        };

        let song = this.sfx.gamePlaySong;
        song.pauseOnBlur = false;
        song.play();

        let collisionSound = this.sfx.collisionSound;

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'sprPlayer'
        );
        const playerNew = this.player;
        const livesBoard = this.add.dom(325, 16, 'h2', `${scoreBoardStyle}`, `LIVES: ${playerNew.getData('lives')}`).setOrigin(0, 0).setDepth(1);

        //this.life = this.add.image(20, 20, 'sprEnemy0').setScale(0.5, 0.5);

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
                playerNew.playerScore(`${enemy.getData('enemyRank')}`);
                scoreBoard.setText(`SCORE: ${playerNew.getData('score')}`);
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
                storage.storeScores(player.getData('score'));
                song.stop();
                //leaderBoardData.submitHighScore('Lain', storage.getMaxScore()).then(r => {return r});
                //leaderBoardData.getScoreBoard().then(r => {return r});
            }
        });

        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if (!player.getData('isDead') &&
                !laser.getData('isDead')) {
                if (player.getData('lives') >= 1){
                    collisionSound.play();
                }
                laser.destroy();
                playerNew.playerLives(`${player.getData('lives')}`);
                livesBoard.setText(`LIVES: ${playerNew.getData('lives')}`);
                //leaderBoardData.submitHighScore('Lain', storage.getMaxScore()).then(r => {return r});
                //leaderBoardData.getScoreBoard().then(r => {return r});
                if (player.getData('lives') <= 1) {
                    song.stop();
                }
            }
            storage.storeScores(player.getData('score'));
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
