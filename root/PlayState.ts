/// <reference path="lib/phaser.d.ts" />
/// <reference path="Main.ts" />
/// <reference path="InitState.ts" />

var player : Phaser.Sprite;

/* preload game assets before starting the game */
function preload() {
    game.load.image("player", "bunny.png");
}

/* create the game world and entities */
function create() {
    player = sprites.create(450, 50, 'player');
}

/* update step before each frame rendering */
function update() {
    game.physics.arcade.collide(sprites, sprites);
}

/* useful for debugging */
function render() {
}
