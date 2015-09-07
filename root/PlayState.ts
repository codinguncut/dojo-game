/// <reference path="lib/phaser.d.ts" />
/// <reference path="Main.ts" />
/// <reference path="InitState.ts" />


/* preload game assets before starting the game */
function preload() {
    game.load.image("player", "bunny.png");
}

/* create the game world and entities */
function create() {
    var player = sprites.create(250, 50, 'player');
}

/* update step before each frame rendering */
function update() {
    game.physics.arcade.collide(sprites, sprites);
}

