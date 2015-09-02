/*jslint node: true */
'use strict';
var Phaser = Phaser || require('libs/phaser');

var fishSprite;
var game;

function preload() {
    game.load.image('fish', 'assets/images/clown_fish.png');
}

function create() {
    fishSprite = game.add.sprite(game.world.centerX, 0, 'fish');
    
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.enable(fishSprite);
    fishSprite.body.velocity.x = 200;
}

function update() {
    //fishSprite.body.moveLeft(10);
}

game = new Phaser.Game(800, 600, Phaser.AUTO, '',
    {
        preload: preload,
        create: create,
        update: update
    }
    );

