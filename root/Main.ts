/// <reference path="lib/phaser.d.ts" />
/// <reference path="PlayState.ts" />
/// <reference path="InitState.ts" />

class Game extends Phaser.Game {
    constructor() {
        // source: see above (joshmorony.com)
        var width = window.innerWidth * window.devicePixelRatio,
            height = window.innerHeight * window.devicePixelRatio;
        // Note: may need to set Phaser.CANVAS for mobile
        super(width, height, Phaser.CANVAS, 'game'); //AUTO);

        this.state.add("init", new InitState());
        this.state.add("play", new PlayState());
        this.state.start("init"); 
    }
}

var game = new Game();

