/// <reference path="lib/phaser.d.ts" />

class InitState extends Phaser.State {
    
    /* initialize the world and create initial elements */
    create() {
        // enable game running when browser is not focussed
        this.game.stage.disableVisibilityChange = true;
        
        // start arcade physics system 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.drawCoords();
    
        // start PlayState
        //this.game.state.start("play", false /* clearWorld */);
    }
    
    // draw coordinate system on screen
    drawCoords() {
        var g = this.game.add.graphics(0, 0);
        var offset = 20;
        var color = 0xffd900;
        var w = this.game.width - offset;
        var h = this.game.height - offset;
        var arrowSize = 0.3;
        var fontSize = 15;
        var fontColor = '#ffd900';

        g.lineStyle(3, color, 1);

        // origin text
        this.game.add.text(offset*2, offset*1.5, "(0, 0)", {
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
        this.game.add.text(w-offset*2, offset*1.5, "(" + w + ', ' + 0 + ')', {
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

