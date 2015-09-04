/// <reference path="lib/phaser.d.ts" />

class InitState extends Phaser.State {
    
    /* initialize the world and create initial elements */
    create() {
        // enable game running when browser is not focussed
        this.game.stage.disableVisibilityChange = true;
        
        // start arcade physics system 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
        // start PlayState
        this.game.state.start("play");
    }
}

