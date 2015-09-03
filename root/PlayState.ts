/// <reference path="lib/phaser.d.ts" />

module states {
    export class PlayState extends Phaser.State {
        player: Phaser.Sprite;
        platform: Phaser.Sprite; // TODO: should be group
        music: Phaser.Sound;
        
        // preload required assets before starting the game
        preload() {
            this.load.image("player", 
                "assets/sprites/beginners_jumperpack/PNG/Players/bunny1_stand.png");
            this.load.image("platform", 
                "assets/sprites/beginners_jumperpack/PNG/Environment/ground_stone_broken.png")
            this.load.audio("music", 
                "assets/music/ehlers/Twists.mp3")
        }
        
        /* initialize the world and create initial elements */
        create() {
            // enable game running when browser is not focussed
            this.game.stage.disableVisibilityChange = true;
            
            // start arcade physics system 
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
                       
            //this.playMusic();
            
            this.addPlatform();

            this.addPlayer();

            this.addText();
            
            this.addCircle();
           
        }

        // consider putting a nicer version in a utility class
        addCircle() {
            var circle = this.game.add.graphics(0, 0);
            circle.beginFill(0x00FF00, 1);
            circle.drawCircle(300, 200, 100);
            circle.endFill();
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
            this.music = this.add.audio("music", 1 /*volume*/, false /*loop*/);
            this.music.play();            
        }

        /* add a background image */
        addPlatform() {
            var platform = this.platform = this.add.sprite(200, 300, "platform");
            this.game.physics.arcade.enableBody(platform);
            platform.scale.setTo(1, 1);
            platform.body.immovable = true;
            platform.body.collideWorldBounds = true;
        }
    
        /* add the player sprite to the game, and enable physics on it */
        addPlayer() {
            // add player sprite to game 
            var player = this.player = this.add.sprite(400, 50, 'player');
            
            // enable physics for player
            this.game.physics.arcade.enableBody(player);
            player.body.gravity.y = 900;
            player.body.drag.x = 900; 
    
            // enable mouse dragging of sprite
            player.inputEnabled = true;
            //player.input.enableDrag(true);
        
            player.events.onInputDown.add(function() {
                player.kill();
                // play sound?
            });
        
            // player will stop moving at screen boundary        
            player.body.collideWorldBounds = true;
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
}
