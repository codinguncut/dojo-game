/// <reference path="lib/phaser.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cursors;
var sprites;
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
        // source: www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
        // myAsset.scale.setTo(scaleRatio, scaleRatio);
        var scaleRatio = 1 / window.devicePixelRatio;
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.scale.setUserScale(scaleRatio, scaleRatio);
        // create shorter cursor aliases
        cursors = game.input.keyboard.createCursorKeys();
        // group for physics sprites
        sprites = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.drawCoords();
        this.game.load.baseURL = "root/assets/";
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
        var fontSize = 20;
        var fontColor = '#ffd900';
        g.lineStyle(3, color, 1);
        // origin text
        this.game.add.text(offset * 2, offset * 1.5, "(0, 0)\n(x, y)", {
            fontSize: fontSize,
            fill: fontColor
        });
        // x-axis text
        this.game.add.text(w / 2.0, offset * 1.5, "x-axis", {
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
        this.game.add.text(w - offset * 4, offset * 1.5, "(" + w + ', ' + 0 + ')', {
            fontSize: fontSize,
            fill: fontColor
        });
        // y-axis text
        this.game.add.text(offset * 2, h / 2.0, "y-axis", {
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
/// <reference path="Main.ts" />
/// <reference path="InitState.ts" />
var GRAVITY = 900;
// need type annotation for autocomplete
var player;
var enemies;
var score = 0;
var scoreText;
/* preload game assets before starting the game */
function preload() {
    game.load.image("player", "bunny.png");
    game.load.image("platform", "platform.png");
    game.load.audio("coin", "coin1.wav");
    // load "tile-packed" sprite atlas
    game.load.atlasXML('jumper', 'kenney/spritesheet_jumper.png', 'kenney/spritesheet_jumper.xml');
}
/* create the game world and entities */
function create() {
    addPlatform();
    enemies = game.add.group();
    addEnemy();
    addPlayer();
    // spawn enemies when clicking in game
    game.input.onDown.add(addEnemy, this);
    addScore();
}
/* update step before each frame rendering */
function update() {
    // player cursor controls
    playerSteer();
    // make enemies fly towards player
    enemies.forEachAlive(function (enemy) {
        var vel = 100;
        game.physics.arcade.moveToObject(enemy, player, vel);
    }, game);
    // player physics interaction with platforms
    game.physics.arcade.collide(sprites, sprites);
    // what happens when player touches enemy
    game.physics.arcade.overlap(player, enemies, enemyContact, null, null);
}
/////////////////////
/* what to do when player touches enemy */
function enemyContact(player, enemy) {
    enemy.kill();
    // update score
    score += 1;
    scoreText.text = "Score: " + score;
    // play coin sound
    // not working in cordova. consider https://github.com/katzer/cordova-plugin-local-notifications/issues/63
    var coin = game.add.audio("coin", 1 /*volume*/, false /*loop*/);
    coin.play();
}
function addScore() {
    scoreText = game.add.text(100, 20, "Score: 0", {
        fontSize: 30,
        fill: 'red'
    });
}
function addPlatform() {
    var platform;
    platform = sprites.create(200, 300, "platform");
    platform.body.immovable = true;
}
function addPlayer() {
    // add player sprite to game 
    player = sprites.create(450, 50, 'player');
    // stop player from moving beyond screen boundary        
    player.body.collideWorldBounds = true;
    // note: physics units are in pixels and seconds
    player.body.gravity.set(0, GRAVITY);
    player.body.drag.set(300); // drag == friction/air resistance
    player.body.bounce.set(0.8); // 80% bounce
}
function addEnemy() {
    var enemy;
    enemy = enemies.create(game.world.randomX, 100, 'jumper');
    // set anchor to middle of sprite
    enemy.anchor.set(.5, .5);
    // enable physics for enemy
    game.physics.arcade.enableBody(enemy);
    enemy.body.collideWorldBounds = true;
    enemy.body.bounce.set(0.8);
    enemy.body.drag.set(100);
    // add 5 sprites from spritesheet 'jumper' to animation
    enemy.animations.add('flap', ['wingMan1.png', 'wingMan2.png', 'wingMan3.png',
        'wingMan4.png', 'wingMan5.png'], 10 /*fps*/, true /*loop*/);
    enemy.animations.play('flap');
}
/* if curser keys are pressed, accelerate the player */
function playerSteer() {
    player.body.acceleration.setTo(0, 0);
    if (cursors.up.isDown) {
        player.body.acceleration.y = -GRAVITY * 1.5;
    }
    if (cursors.left.isDown) {
        player.body.acceleration.x = -900;
    }
    if (cursors.right.isDown) {
        player.body.acceleration.x = 900;
    }
}
/// <reference path="lib/phaser.d.ts" />
/// <reference path="PlayState.ts" />
/// <reference path="InitState.ts" />
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        // source: see above (joshmorony.com)
        var width = window.innerWidth * window.devicePixelRatio, height = window.innerHeight * window.devicePixelRatio;
        // Note: may need to set Phaser.CANVAS for mobile
        _super.call(this, width, height, Phaser.CANVAS, 'game'); //AUTO);
        this.state.add("init", new InitState());
        var playState = {
            preload: preload,
            create: create,
            update: update
        };
        this.state.add("play", playState);
        this.state.start("init");
    }
    return Game;
})(Phaser.Game);
var game = new Game();
