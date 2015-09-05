/// <reference path="lib/phaser.d.ts" />
/// <reference path="Main.ts" />
/// <reference path="InitState.ts" />

const GRAVITY = 900; 

// need type annotation for autocomplete
var player : Phaser.Sprite;
var enemies : Phaser.Group;
var platforms : Phaser.Group; // game.add.physicsGroup()

var score = 0;
var scoreText : Phaser.Text;

/* preload game assets before starting the game */
function preload() {
    game.load.image("player", "bunny.png");
    game.load.image("platform", "platform.png");
    game.load.audio("coin", "coin1.wav");
    
    // packed atlas spritesheet
    game.load.atlasXML('jumper', 
        'kenney/spritesheet_jumper.png', 'kenney/spritesheet_jumper.xml');
    
    // source: http://phaser.io/examples/v2/tilemaps/mario
    //game.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, 
    //    Phaser.Tilemap.TILED_JSON);
    
    // fixed size spritesheet
    //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

/* create the game world and entities */
function create() {
    // NOTE: order of sprites added is relevant

    //playMusic();
    
    platforms = game.add.group();
    addPlatform();

    addPlayer();
    
    enemies = game.add.group();
    addEnemy();
    
    // callback can take "pointer" param
    game.input.onDown.add(addEnemy, this);
    
    // event listener for mobile devices
    window.addEventListener("deviceorientation", handleOrientation, true);

    addScore();
}

/* update step before each frame rendering */
function update() {
    playerSteer();       
    
    var vel = 100;
    enemies.forEachAlive((enemy : Phaser.Sprite) => {
        game.physics.arcade.moveToObject(enemy, player, 100);
    }, game);
    
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, enemies, enemyContact, null, null);
}


/////////////////////


/* what to do when player touches enemy */
function enemyContact(player : Phaser.Sprite, enemy : Phaser.Sprite) {
    enemy.kill();
    
    score += 1;
    scoreText.text = "Score: " + score;
    
    var coin = game.add.audio("coin", 1 /*volume*/, false /*loop*/);
    coin.play();            
}

/* set player gravity based on device orientation */    
function handleOrientation(e) {
    if (e.gamma != null) {
        var x = e.gamma / 90.0; // gamma is (-90, 90)
        var y = e.beta / 90.0;  // beta is (-90, 90), when not upside-down
        var mag = Math.sqrt(x*x + y*y);
        var g = 900 / mag;
        player.body.gravity.set(x*g, y*g);
    }
}

function addScore() {    
    scoreText = game.add.text(80, 20, "Score: 0", {
        fontSize: 40, 
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
    // player will stop moving at screen boundary        
    player.body.collideWorldBounds = true;

    // physics units are pixels/second/second
    player.body.gravity.set(0, 900);
    player.body.drag.set(300); 
    player.body.bounce.set(0.8);


    // enable mouse interaction with sprite
    player.inputEnabled = true;
    
    // drag doesn't work well with gravity
    //player.input.enableDrag(true);

    // kill player when clicked on
    player.events.onInputDown.add(() => {
        player.kill();
        // play sound?
    });
}

function addEnemy() {
    
    var wingman : Phaser.Sprite;
    wingman = enemies.create(game.world.randomX, 100, 'jumper');
    // set anchor to middle of sprite
    wingman.anchor.set(.5, .5);

    
    // enable physics for player
    game.physics.arcade.enableBody(wingman);
    wingman.body.collideWorldBounds = true;
    wingman.body.bounce.set(0.8);
    wingman.body.drag.set(100);
    
    wingman.animations.add(
        'flap', [110, 111, 112, 113, 114], 10 /*fps*/, true /*loop*/);
    wingman.animations.play('flap');
}


/* if curser keys are pressed, accelerate the player */    
function playerSteer() {
    player.body.acceleration.setTo(0, 0);
    
    if (cursors.up.isDown) {
        player.body.acceleration.y = -1300;
    }
    if (cursors.left.isDown) {
        player.body.acceleration.x = -900;
    }
    if (cursors.right.isDown) {
        player.body.acceleration.x = 900;
    }
}

