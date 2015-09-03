/// <reference path="lib/phaser.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            _super.apply(this, arguments);
        }
        // preload required assets before starting the game
        PlayState.prototype.preload = function () {
            this.load.image("player", "assets/sprites/beginners_jumperpack/PNG/Players/bunny1_stand.png");
            this.load.image("platform", "assets/sprites/beginners_jumperpack/PNG/Environment/ground_stone_broken.png");
            this.load.audio("music", "assets/music/ehlers/Twists.mp3");
        };
        /* initialize the world and create initial elements */
        PlayState.prototype.create = function () {
            // enable game running when browser is not focussed
            this.game.stage.disableVisibilityChange = true;
            // start arcade physics system 
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            //this.playMusic();
            this.addPlatform();
            this.addPlayer();
            this.addText();
            this.addCircle();
        };
        // consider putting a nicer version in a utility class
        PlayState.prototype.addCircle = function () {
            var circle = this.game.add.graphics(0, 0);
            circle.beginFill(0x00FF00, 1);
            circle.drawCircle(300, 200, 100);
            circle.endFill();
        };
        PlayState.prototype.addText = function () {
            var text = this.add.text(200, 200, "hello world", {
                fontSize: 64,
                fill: 'red',
                font: 'bold 20pt Times New Roman'
            });
            text.scale.setTo(2, 2);
            text.angle = 20;
        };
        PlayState.prototype.playMusic = function () {
            this.music = this.add.audio("music", 1 /*volume*/, false /*loop*/);
            this.music.play();
        };
        /* add a background image */
        PlayState.prototype.addPlatform = function () {
            var platform = this.platform = this.add.sprite(200, 300, "platform");
            this.game.physics.arcade.enableBody(platform);
            platform.scale.setTo(1, 1);
            platform.body.immovable = true;
            platform.body.collideWorldBounds = true;
        };
        /* add the player sprite to the game, and enable physics on it */
        PlayState.prototype.addPlayer = function () {
            // add player sprite to game 
            var player = this.player = this.add.sprite(400, 50, 'player');
            // enable physics for player
            this.game.physics.arcade.enableBody(player);
            player.body.gravity.y = 900;
            player.body.drag.x = 900;
            // enable mouse dragging of sprite
            player.inputEnabled = true;
            //player.input.enableDrag(true);
            player.events.onInputDown.add(function () {
                player.kill();
                // play sound?
            });
            // player will stop moving at screen boundary        
            player.body.collideWorldBounds = true;
        };
        /* called before each rendering frame */
        PlayState.prototype.update = function () {
            this.playerSteer();
            this.game.physics.arcade.collide(this.player, this.platform);
        };
        /* if curser keys are pressed, accelerate the player */
        PlayState.prototype.playerSteer = function () {
            this.player.body.acceleration.x = 0;
            this.player.body.acceleration.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.player.body.acceleration.y = -1300;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.player.body.acceleration.x = -900;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.player.body.acceleration.x = 900;
            }
        };
        /* useful for debug information */
        PlayState.prototype.render = function () {
        };
        return PlayState;
    })(Phaser.State);
    states.PlayState = PlayState;
})(states || (states = {}));
/// <reference path="lib/phaser.d.ts" />
/// <reference path="PlayState.ts" />
// source: www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
// myAsset.scale.setTo(scaleRatio, scaleRatio);
var scaleRatio = window.devicePixelRatio / 3;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        // source: see above (joshmorony.com)
        var width = window.innerWidth * window.devicePixelRatio, height = window.innerHeight * window.devicePixelRatio;
        // Note: may need to set Phaser.CANVAS for mobile
        _super.call(this, width, height, Phaser.AUTO, null, new states.PlayState());
    }
    return Game;
})(Phaser.Game);
var game = new Game();
