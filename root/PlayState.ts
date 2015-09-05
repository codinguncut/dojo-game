/// <reference path="lib/phaser.d.ts" />
/// <reference path="Main.ts" />
/// <reference path="InitState.ts" />

const GRAVITY = 900; 

// need type annotation for autocomplete
var player : Phaser.Sprite;
var enemies : Phaser.Group;

var score = 0;
var scoreText : Phaser.Text;


/* preload game assets before starting the game */
function preload() {
    game.load.image("player", "bunny.png");
    game.load.image("platform", "platform.png");
    
    game.load.audio("coin", "coin1.wav");
    
    // load "tile-packed" sprite atlas
    game.load.atlasXML('jumper', 
        'kenney/spritesheet_jumper.png', 'kenney/spritesheet_jumper.xml');    
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
    enemies.forEachAlive((enemy : Phaser.Sprite) => {
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
function enemyContact(player : Phaser.Sprite, enemy : Phaser.Sprite) {
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
    var platform : Phaser.Sprite;
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
    var enemy : Phaser.Sprite;
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
        player.body.acceleration.y = -GRAVITY*1.5;
    }
    if (cursors.left.isDown) {
        player.body.acceleration.x = -900;
    }
    if (cursors.right.isDown) {
        player.body.acceleration.x = 900;
    }
}

