/// <reference path="lib/phaser.d.ts" />
/// <reference path="Main.ts" />
/// <reference path="InitState.ts" />

const GRAVITY = 900; 

// need type annotation for autocomplete
var player : Phaser.Sprite;
var enemies : Phaser.Group;
var platforms : Phaser.Group; 

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
    
    // load tilemap created with "Tiled" editor
    // source: http://phaser.io/examples/v2/tilemaps/mario
    //game.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, 
    //    Phaser.Tilemap.TILED_JSON);
    
    // load fixed size spritesheet
    //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

/* create the game world and entities */
function create() {
    platforms = game.add.group(); // game.add.physicsGroup()
    addPlatform();

    enemies = game.add.group();
    addEnemy();

    addPlayer();

    // spawn enemies when clicking in game
    game.input.onDown.add(addEnemy, this);
    
    // event listener for mobile devices
    window.addEventListener("deviceorientation", updatePlayerGravity, true);

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
    game.physics.arcade.collide(player, platforms);
    
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
    var coin = game.add.audio("coin", 1 /*volume*/, false /*loop*/);
    coin.play();            
}

/* set player gravity based on mobile device orientation */    
function updatePlayerGravity(orientation) {
    // make sure we are getting valid orientation
    if (orientation.gamma != null) {
        var x = orientation.gamma / 90.0; // gamma is (-90, 90)
        var y = orientation.beta / 90.0;  // beta is (-90, 90), when not upside-down
        var mag = Math.sqrt(x*x + y*y);
        var g = GRAVITY / mag;
        player.body.gravity.set(x*g, y*g);
    }
}

function addScore() {    
    scoreText = game.add.text(100, 20, "Score: 0", {
        fontSize: 30, 
        fill: 'red'
        //font: 'bold 20pt Times New Roman'
    });
    //scoreText.scale.setTo(2, 2);
    //scoreText.angle = 20;
}

function addPlatform() {   
    var platform : Phaser.Sprite;
    platform = platforms.create(200, 300, "platform");
    game.physics.arcade.enableBody(platform);
    platform.body.immovable = true;
}

function addPlayer() {
    // add player sprite to game 
    player = game.add.sprite(450, 50, 'player');
    
    // enable physics for player
    game.physics.arcade.enableBody(player);
    // stop player from moving beyond screen boundary        
    player.body.collideWorldBounds = true;

    // note: physics units are in pixels and seconds
    player.body.gravity.set(0, GRAVITY);
    player.body.drag.set(300); // drag == friction/air resistance
    player.body.bounce.set(0.8); // 80% bounce


    // enable mouse interaction with sprite
    player.inputEnabled = true;
    
    // make player draggable using the mouse
    // note: drag doesn't work well with player gravity enabled
    //player.input.enableDrag(true);

    // kill player when clicked on
    player.events.onInputDown.add(() => {
        player.kill();
        // play sound?
    });
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
    
    // add frames 110-114 from spritesheet 'jumper' to animation
    enemy.animations.add(
        'flap', [110, 111, 112, 113, 114], 10 /*fps*/, true /*loop*/);
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

