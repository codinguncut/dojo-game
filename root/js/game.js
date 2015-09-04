/// <reference path="lib/phaser.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayState = (function (_super) {
    __extends(PlayState, _super);
    function PlayState() {
        _super.apply(this, arguments);
    }
    // preload required assets before starting the game
    PlayState.prototype.preload = function () {
        this.load.image("player", "root/assets/bunny.png");
        this.load.image("platform", "root/assets/platform.png");
        this.load.audio("music", "root/assets/Twists.mp3");
    };
    /* initialize the world and create initial elements */
    PlayState.prototype.create = function () {
        // NOTE: order of sprites added is relevant
        //this.playMusic();
        this.addPlatform();
        this.addPlayer();
        this.addText();
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
        var music = this.add.audio("music", 1 /*volume*/, false /*loop*/);
        music.play();
    };
    /* add a platform */
    PlayState.prototype.addPlatform = function () {
        this.platform = this.add.sprite(200, 300, "platform");
        this.platform.scale.setTo(1, 1);
        this.game.physics.arcade.enableBody(this.platform);
        this.platform.body.immovable = true;
    };
    /* add the player sprite to the game, and enable physics on it */
    PlayState.prototype.addPlayer = function () {
        var _this = this;
        // add player sprite to game 
        this.player = this.add.sprite(400, 50, 'player');
        // enable physics for player
        this.game.physics.arcade.enableBody(this.player);
        // player will stop moving at screen boundary        
        this.player.body.collideWorldBounds = true;
        // pixels/second/second
        this.player.body.gravity.set(0, 900);
        this.player.body.drag.set(300);
        this.player.body.bounce.set(0.8);
        // enable mouse interaction with sprite
        this.player.inputEnabled = true;
        // drag doesn't work well with gravity
        //player.input.enableDrag(true);
        // kill player when clicked on
        this.player.events.onInputDown.add(function () {
            _this.player.kill();
            // play sound?
        });
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
/// <reference path="lib/phaser.d.ts" />
var InitState = (function (_super) {
    __extends(InitState, _super);
    function InitState() {
        _super.apply(this, arguments);
    }
    /* initialize the world and create initial elements */
    InitState.prototype.create = function () {
        // enable game running when browser is not focussed
        this.game.stage.disableVisibilityChange = true;
        // start arcade physics system 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // start PlayState
        this.game.state.start("play");
    };
    return InitState;
})(Phaser.State);
/// <reference path="lib/phaser.d.ts" />
/// <reference path="PlayState.ts" />
/// <reference path="InitState.ts" />
// source: www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
// myAsset.scale.setTo(scaleRatio, scaleRatio);
var scaleRatio = window.devicePixelRatio / 3;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        // source: see above (joshmorony.com)
        var width = window.innerWidth * window.devicePixelRatio, height = window.innerHeight * window.devicePixelRatio;
        // Note: may need to set Phaser.CANVAS for mobile
        _super.call(this, width, height, Phaser.AUTO);
        this.state.add("init", new InitState());
        this.state.add("play", new PlayState());
        this.state.start("init");
    }
    return Game;
})(Phaser.Game);
var game = new Game();
