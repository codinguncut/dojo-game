/// <reference path="lib/phaser.d.ts" />

class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, "phaser-example", null);
        this.state.add("play", new PlayState());
        this.state.start("play");
    }
}


class PlayState extends Phaser.State {
    background: Phaser.Sprite;
    player: Phaser.Sprite;
    music: Phaser.Sound;
    
    preload() {
        this.load.image("player", "assets/sprites/beginners_jumperpack/PNG/Players/bunny1_stand.png");
        this.load.image("background", "assets/sprites/backgroundelements/PNG/castle_beige.png")
        this.load.audio("music", "assets/music/ehlers/Twists.mp3")
    }
    
    create() {
        // enable running when browser is not focussed
        this.game.stage.disableVisibilityChange = true;
        
        // arcade physics system. bounding box == image extent(?) 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.music = this.add.audio("music", 1, false);
        //this.music.play();            

        this.background = this.add.sprite(0, 0, "background");
        
        this.player = this.add.sprite(200, 200, 'player');
        game.physics.arcade.enableBody(this.player);
        this.player.body.gravity.y = 900;
        
        //this.player.inputEnabled = true;
        this.player.body.collideWorldBounds = true;
        //this.player.input.enableDrag();
    }
    
    update() {
        //this.player.angle += 1;
        
        this.player.body.velocity.x = 0;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.velocity.x -= 150;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.velocity.x += 150;
        }
    }
}


var game = new Game();

