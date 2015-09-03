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
        this.load.image("player", "assets/sprites/beginners_jumperpack/PNG/Players/bunny1_stand.png");
        this.load.image("background", "assets/sprites/backgroundelements/PNG/castle_beige.png");
        this.load.audio("music", "assets/music/ehlers/Twists.mp3");
    };
    // initialize the world and create initial elements
    PlayState.prototype.create = function () {
        // enable game running when browser is not focussed
        this.game.stage.disableVisibilityChange = true;
        // select arcade physics system 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.playMusic();
        this.background = this.add.sprite(0, 0, "background");
        this.addPlayer();
    };
    PlayState.prototype.playMusic = function () {
        this.music = this.add.audio("music", 1 /*volume*/, false /*loop*/);
        this.music.play();
    };
    PlayState.prototype.addPlayer = function () {
        // add player image to game 
        var player = this.player = this.add.sprite(200, 200, 'player');
        // enable physics for player
        game.physics.arcade.enableBody(player);
        player.body.gravity.y = 900;
        player.body.drag.x = 900;
        // player will stop moving at screen boundary        
        player.body.collideWorldBounds = true;
        return player;
    };
    // called before each rendering frame
    PlayState.prototype.update = function () {
        //this.player.angle += 1;
        this.playerAccel();
    };
    PlayState.prototype.playerAccel = function () {
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
    return PlayState;
})(Phaser.State);
exports.PlayState = PlayState;
