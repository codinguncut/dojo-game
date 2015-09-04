/// <reference path="lib/phaser.d.ts" />

class PlayState extends Phaser.State {
    // need type annotation for autocomplete
    player: Phaser.Sprite;
    enemies: Phaser.Group;
    platforms:  Phaser.Group; 
    
    /* preload required assets before starting the game */
    preload() {
        this.load.image("player", "root/assets/bunny.png");
        this.load.image("platform", "root/assets/platform.png");
        /*
        //this.load.audio("music", "root/assets/Twists.mp3");
        this.game.load.atlasXML('jumper', 
            'root/assets/spritesheet_jumper.png', 
            'root/assets/spritesheet_jumper.xml');
        */
    }
    
    /* initialize the world and create initial elements */
    create() {
        // NOTE: order of sprites added is relevant

        //this.playMusic();
        
        this.buildLevel();

        this.addPlayer();
        
        //this.addEnemies();

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
    buildLevel() {
        this.platforms = this.add.group();
        
        var platform : Phaser.Sprite;
        platform = this.platforms.create(200, 300, "platform");
        this.game.physics.arcade.enableBody(platform);
        platform.body.immovable = true;
    }

    /* add the player sprite to the game, and enable physics on it */
    addPlayer() {
        // add player sprite to game 
        this.player = this.add.sprite(450, 50, 'player');
        
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
    
    addEnemies() {
        this.enemies = this.add.group();
        
        var wingman : Phaser.Sprite;
        wingman = this.enemies.create(330, 100, 'jumper');
        // set anchor to middle of sprite
        wingman.anchor.set(.5, .5);

        
        // enable physics for player
        this.game.physics.arcade.enableBody(wingman);
        wingman.body.collideWorldBounds = true;
        wingman.body.bounce.set(0.8);
        wingman.body.drag.set(100);
        
        wingman.animations.add('flap', [110, 111, 112, 113, 114], 10 /*fps*/, true /*loop*/);
        wingman.animations.play('flap');
    }
    
    /* called before each rendering frame */
    update() {
        /*
        this.playerSteer();        

        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.player, this.enemies);
        */
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
}

