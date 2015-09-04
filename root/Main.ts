/// <reference path="lib/phaser.d.ts" />
/// <reference path="PlayState.ts" />
/// <reference path="InitState.ts" />

// source: www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
// myAsset.scale.setTo(scaleRatio, scaleRatio);
var scaleRatio = window.devicePixelRatio / 3;

class Game extends Phaser.Game {
    constructor() {
        // source: see above (joshmorony.com)
        var width = window.innerWidth, // * window.devicePixelRatio,
            height = window.innerHeight; // * window.devicePixelRatio;
        // Note: may need to set Phaser.CANVAS for mobile
        super(width, height, Phaser.CANVAS); //AUTO);

        this.state.add("init", new InitState());
        this.state.add("play", new PlayState());
        this.state.start("init"); 
    }
}

var game = new Game();

