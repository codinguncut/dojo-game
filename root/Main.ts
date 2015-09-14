/// <reference path="lib/phaser.d.ts" />
/// <reference path="PlayState.ts" />
/// <reference path="InitState.ts" />

class Game extends Phaser.Game {
    constructor() {
        // source: see above (joshmorony.com)
        var width = window.innerWidth * window.devicePixelRatio,
            height = window.innerHeight * window.devicePixelRatio;
        super(width, height, Phaser.CANVAS, 'game');

        this.state.add("init", new InitState());
        
        // anonymous state object to prevent need for "this"
        var playState = {
            preload: preload,
            create: create,
            update: update,
            render: render
        }

        this.state.add("play", playState);
        this.state.start("init"); 
    }
}

var game = new Game();
