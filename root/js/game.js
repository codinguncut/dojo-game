/// <reference path="lib/phaser.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        // width 800, height 600, render into DOM element "phaser-example", null for preload/create/update functions
        // TODO: scale canvas to browser size
        _super.call(this, 800, 600, Phaser.AUTO, "phaser-example", null);
        this.state.add("play", new PlayState());
        this.state.start("play");
    }
    return Game;
})(Phaser.Game);
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
        // enable running when browser is not focussed
        this.game.stage.disableVisibilityChange = true;
        // arcade physics system. bounding box == image extent(?) 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.music = this.add.audio("music", 1, false);
        //this.music.play();            
        this.background = this.add.sprite(0, 0, "background");
        this.player = this.add.sprite(200, 200, 'player');
        game.physics.arcade.enableBody(this.player);
        this.player.body.gravity.y = 900;
        //this.player.inputEnabled = true;
        this.player.body.collideWorldBounds = true;
        //this.player.input.enableDrag();
    };
    // called before each rendering frame
    PlayState.prototype.update = function () {
        //this.player.angle += 1;
        this.player.body.velocity.x = 0;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.velocity.x -= 150;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.velocity.x += 150;
        }
    };
    return PlayState;
})(Phaser.State);
var game = new Game();
