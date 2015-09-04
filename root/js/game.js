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
    /* preload required assets before starting the game */
    PlayState.prototype.preload = function () {
        this.load.image("player", "root/assets/bunny.png");
        this.load.image("platform", "root/assets/platform.png");
        //this.load.audio("music", "root/assets/Twists.mp3");
        this.game.load.atlasXML('jumper', 'root/assets/spritesheet_jumper.png', 'root/assets/spritesheet_jumper.xml');
    };
    /* initialize the world and create initial elements */
    PlayState.prototype.create = function () {
        // NOTE: order of sprites added is relevant
        //this.playMusic();
        this.buildLevel();
        this.addPlayer();
        this.addEnemies();
        //this.createButton();
        //this.addText();
    };
    PlayState.prototype.createButton = function () {
        this.game.add.button(400, 400, 'platform', function () {
            console.log('hello world');
        });
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
    PlayState.prototype.buildLevel = function () {
        this.platforms = this.add.group();
        var platform;
        platform = this.platforms.create(200, 300, "platform");
        this.game.physics.arcade.enableBody(platform);
        platform.body.immovable = true;
    };
    /* add the player sprite to the game, and enable physics on it */
    PlayState.prototype.addPlayer = function () {
        var _this = this;
        // add player sprite to game 
        this.player = this.add.sprite(450, 50, 'player');
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
    PlayState.prototype.addEnemies = function () {
        this.enemies = this.add.group();
        var wingman;
        wingman = this.enemies.create(330, 100, 'jumper');
        // set anchor to middle of sprite
        wingman.anchor.set(.5, .5);
        // enable physics for player
        this.game.physics.arcade.enableBody(wingman);
        wingman.body.collideWorldBounds = true;
        wingman.body.bounce.set(0.8);
        wingman.body.drag.set(100);
        wingman.animations.add('flap', [110, 111, 112, 113, 114], 10 /*fps*/, true /*loop*/);
        wingman.animations.play('flap');
    };
    /* called before each rendering frame */
    PlayState.prototype.update = function () {
        this.playerSteer();
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.player, this.enemies);
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
        this.drawCoords();
        // start PlayState
        this.game.state.start("play", false /* clearWorld */);
    };
    // draw coordinate system on screen
    InitState.prototype.drawCoords = function () {
        var g = this.game.add.graphics(0, 0);
        var offset = 20;
        var color = 0xffd900;
        var w = this.game.width - offset;
        var h = this.game.height - offset;
        var arrowSize = 0.3;
        var fontSize = 15;
        var fontColor = '#ffd900';
        g.lineStyle(3, color, 1);
        // origin text
        this.game.add.text(offset * 2, offset * 1.5, "(0, 0)", {
            fontSize: fontSize,
            fill: fontColor
        });
        // x-axis
        g.beginFill(color);
        g.moveTo(offset, offset);
        g.lineTo(w, offset);
        g.endFill();
        // x triangle
        g.beginFill(color);
        g.moveTo(w - offset, offset * (1 - arrowSize));
        g.lineTo(w - offset, offset * (1 + arrowSize));
        g.lineTo(w, offset);
        g.endFill();
        // x text
        this.game.add.text(w - offset * 2, offset * 1.5, "(" + w + ', ' + 0 + ')', {
            fontSize: fontSize,
            fill: fontColor
        });
        // y-axis
        g.beginFill(color);
        g.moveTo(offset, offset);
        g.lineTo(offset, h);
        g.endFill();
        // y triangle
        g.beginFill(color);
        g.moveTo(offset * (1 - arrowSize), h - offset);
        g.lineTo(offset * (1 + arrowSize), h - offset);
        g.lineTo(offset, h);
        g.endFill();
        // y text
        this.game.add.text(offset * 2, h - offset, "(" + 0 + ', ' + h + ')', {
            fontSize: fontSize,
            fill: fontColor
        });
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
        _super.call(this, width, height, Phaser.CANVAS); //AUTO);
        this.state.add("init", new InitState());
        this.state.add("play", new PlayState());
        this.state.start("init");
    }
    return Game;
})(Phaser.Game);
var game = new Game();
