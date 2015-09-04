/// <reference path="lib/phaser.d.ts" />

class PlayState extends Phaser.State {
    // need type annotation for autocomplete
    player:     Phaser.Sprite;
    platform:   Phaser.Sprite; // TODO: should be group
    
    // preload required assets before starting the game
    preload() {
        this.load.image("player", "root/assets/bunny.png");
        this.load.image("platform", "root/assets/platform.png")
        this.load.audio("music", "root/assets/Twists.mp3")
    }
    
    /* initialize the world and create initial elements */
    create() {
        // NOTE: order of sprites added is relevant

        //this.playMusic();
        
        this.addPlatform();

        this.addPlayer();

        //this.createButton();

        //this.addText();
    }

    createButton() {
        this.game.add.button(400, 400, 'platform', () => {
            console.log('hello world');
        });
    }

    addText() {    
        var text = this.add.text(200, 200, "hello world", {
            fontSize: 64, 
            fill: 'red',
            font: 'bold 20pt Times New Roman'
        });
        text.scale.setTo(2, 2);
        text.angle = 20;
    }

    playMusic() {
        var music = this.add.audio("music", 1 /*volume*/, false /*loop*/);
        music.play();            
    }

    /* add a platform */
    addPlatform() {
        this.platform = this.add.sprite(200, 300, "platform");
        this.platform.scale.setTo(1, 1);

        this.game.physics.arcade.enableBody(this.platform);
        this.platform.body.immovable = true;
    }

    /* add the player sprite to the game, and enable physics on it */
    addPlayer() {
        // add player sprite to game 
        this.player = this.add.sprite(400, 50, 'player');
        
        // enable physics for player
        this.game.physics.arcade.enableBody(this.player);
        // player will stop moving at screen boundary        
        this.player.body.collideWorldBounds = true;

        // pixels/second/second
        this.player.body.gravity.set(0, 900);
        this.player.body.drag.set(300); 
        this.player.body.bounce.set(0.8);

        // enable mouse interaction with sprite
        this.player.inputEnabled = true;
        
        // drag doesn't work well with gravity
        //player.input.enableDrag(true);
    
        // kill player when clicked on
        this.player.events.onInputDown.add(() => {
            this.player.kill();
            // play sound?
        });
    }
    
    /* called before each rendering frame */
    update() {
        this.playerSteer();        

        this.game.physics.arcade.collide(this.player, this.platform);
    }

    /* if curser keys are pressed, accelerate the player */    
    playerSteer() {
        this.player.body.acceleration.x = 0;
        this.player.body.acceleration.y = 0;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.player.body.acceleration.y = -1300;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.acceleration.x = -900;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.acceleration.x = 900;
        }
    }
    
    /* useful for debug information */
    render() {
    }
}

