ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',
    'game.entities.touchpad'
)
.defines(function(){

MyGame = ig.Game.extend({

    font: new ig.Font( 'media/04b03.font.png' ),
    touchpad: null,

    init: function() {
        ig.input.bind( ig.KEY.MOUSE1, 'click' );
    },

    update: function() {
        this.parent();

        if(ig.input.state('click')) {
            if(!this.touchpad) {
                var x = ig.input.mouse.x;
                var y = ig.input.mouse.y;
                this.touchpad = this.spawnEntity(EntityTouchpad, x, y);
            }
        }
    },

    draw: function() {
        // Draw all entities and backgroundMaps
        this.parent();

        // Add your own drawing code here
        var x = ig.system.width/2,
            y = ig.system.height/2;

        this.font.draw( 'Click and drag the mouse...', x, y, ig.Font.ALIGN.CENTER );
    }
});

ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});