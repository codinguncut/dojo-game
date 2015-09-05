
# Phaser Resources
* http://phaser.io/tutorials/making-your-first-phaser-game
* http://gamemechanicexplorer.com/
* a million examples in phaser github
* http://phaser.io/sandbox
* http://mightyfingers.com/

# Managing Screen Size
* http://sbcgamesdev.blogspot.ie/2015/04/phaser-tutorial-manage-different-screen.html
* http://www.html5gamedevs.com/topic/5949-solution-scaling-for-multiple-devicesresolution-and-screens/
* http://www.html5gamedevs.com/topic/1380-how-to-scale-entire-game-up/

# Game Art Resources
* http://kenney.nl/assets
* http://www.glitchthegame.com/public-domain-game-art/
* http://www.widgetworx.com/spritelib/
* [open bundle](http://open.commonly.cc/unlocked)
* http://opengameart.org/
* [Rainer's tileset](http://www.reinerstilesets.de/) (very specific style)
* [free art packs](https://www.reddit.com/r/gamedev/comments/3j8cg8/free_game_art_ultimate_platformer_game_art_pack/)
* [phaser-examples/assets/](https://github.com/photonstorm/phaser-examples/tree/master/examples/assets)
* [420 RPG tiles](http://7soul1.deviantart.com/art/420-Pixel-Art-Icons-for-RPG-129892453)
* [Synso](http://bagfullofwrong.co.uk/bagfullofwords/abuse-my-ip-make-games/)

# Sprite Sheets
* http://www.leshylabs.com/apps/sstool/
* http://renderhjs.net/shoebox/ (have to tweak output for Phaser)
* https://spritesheetpacker.codeplex.com/

# Create own sprites
* http://piq.codeus.net/
* http://www.piskelapp.com/ (save as png)
* http://pyxeledit.com/

# Level Editing
* [Tiled](http://www.mapeditor.org/)
* https://github.com/nkholski/phaser-tiled-extras
* https://github.com/englercj/phaser-tiled

# Audio
* https://github.com/tonistiigi/audiosprite

# TODO
* create git snapshots/tags for incremental tasks
* setup .settings/launch.json for web server
* consider using "tsc --watch" in launch.json
* set output directory for intermediate json files
* http://www.inkfood.com/minimal-ui-on-ios8/
 
# Code Notes
    // load tilemap created with "Tiled" editor
    // source: http://phaser.io/examples/v2/tilemaps/mario
    //game.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, 
    //    Phaser.Tilemap.TILED_JSON);
    
    // load fixed size spritesheet
    //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    // event listener for mobile devices
    window.addEventListener("deviceorientation", updatePlayerGravity, true);

    /* set player gravity based on mobile device orientation */    
    function updatePlayerGravity(orientation) {
        // make sure we are getting valid orientation
        if (orientation.gamma != null) {
            var x = orientation.gamma / 90.0; // gamma is (-90, 90)
            var y = orientation.beta / 90.0;  // beta is (-90, 90), when not upside-down
            var mag = Math.sqrt(x*x + y*y);
            var g = GRAVITY / mag;
            player.body.gravity.set(x*g, y*g);
        }
    }

    // make player draggable using the mouse
    // note: drag doesn't work well with player gravity enabled
    //player.input.enableDrag(true);

    // enable mouse interaction with sprite
    player.inputEnabled = true;
    
    // kill player when clicked on
    player.events.onInputDown.add(() => {
        player.kill();
        // play sound?
    });


