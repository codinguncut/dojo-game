/// <reference path="lib/phaser.d.ts" />

var cursors : Phaser.CursorKeys;
var sprites : Phaser.Group;

class InitState extends Phaser.State {
    
    /* initialize the world and create initial elements */
    create() {
        // continue running game when browser is not focussed
        this.game.stage.disableVisibilityChange = true;
        
        // start arcade physics system (AABB)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // source: www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
        // myAsset.scale.setTo(scaleRatio, scaleRatio);
        var scaleRatio = 1 / window.devicePixelRatio;

        // TODO: better scale mgmt.
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.scale.setUserScale(scaleRatio, scaleRatio);
        
        // create shorter cursor aliases
        cursors = game.input.keyboard.createCursorKeys();
        
        // group for physics-enabled sprites
        sprites = this.game.add.physicsGroup(Phaser.Physics.ARCADE);

        this.drawCoords();
        
        this.game.load.baseURL = "root/assets/";

        // gray background to show black text
        this.game.stage.backgroundColor = '#444444';
    
        // start PlayState
        this.game.state.start("play", false /* clearWorld */);
    }
    
    // draw coordinate system on screen
    drawCoords() {
        var g = this.game.add.graphics(0, 0);
        var offset = 20;
        var color = 0xffd900;
        var w = this.game.width - offset;
        var h = this.game.height - offset;
        var arrowSize = 0.3;
        var fontSize = 20;
        var fontColor = '#ffd900';

        g.lineStyle(3, color, 1);

        // origin text
        this.game.add.text(offset*2, offset*1.5, "(0, 0)\n(x, y)", {
            fontSize: fontSize,
            fill: fontColor
        });

        // x-axis text
        this.game.add.text(w/2.0, offset*1.5, "x-axis", {
            fontSize: fontSize,
            fill: fontColor
        });

        // x-axis
        g.beginFill(color);
        g.moveTo(offset, offset);
        g.lineTo(w, offset);
        g.endFill();
        
        // x triangle
        g.beginFill(color);
        g.moveTo(w - offset, offset*(1-arrowSize));
        g.lineTo(w - offset, offset*(1+arrowSize));
        g.lineTo(w, offset);
        g.endFill();
        
        // x text
        this.game.add.text(w-offset*4, offset*1.5, "(" + w + ', ' + 0 + ')', {
            fontSize: fontSize,
            fill: fontColor
        });

        // y-axis text
        this.game.add.text(offset*2, h/2.0, "y-axis", {
            fontSize: fontSize,
            fill: fontColor
        });

        // y-axis
        g.beginFill(color);
        g.moveTo(offset, offset);
        g.lineTo(offset, h);
        g.endFill();

        // y triangle
        g.beginFill(color);
        g.moveTo(offset*(1-arrowSize), h - offset);
        g.lineTo(offset*(1+arrowSize), h - offset);
        g.lineTo(offset, h);
        g.endFill();

        // y text
        this.game.add.text(offset*2, h-offset, "(" + 0 + ', ' + h + ')', {
            fontSize: fontSize,
            fill: fontColor
        });

    }
}

