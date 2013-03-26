ig.module('game.entities.touchpad')

.requires('impact.entity')

.defines(function() {

    EntityTouchpad = ig.Entity.extend({

        _wmIgnore: true,

        size: {
            x: 50,
            y: 50
        },

        gravityFactor: 0,
        angle_in_degrees: 0,
        direction: null,
        distance: 0, // between center of entity and touchpoint
        sensitivity: 15, // pixel distance from center before movement is called

        animSheet: new ig.AnimationSheet( 'media/touchpad.png', 50, 50 ),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('none', 1, [0]);
            this.addAnim('up', 1, [1]);
            this.addAnim('right', 1, [2]);
            this.addAnim('down', 1, [3]);
            this.addAnim('left', 1, [4]);

            // Center entity over initial position.
            this.pos.x -= ( this.size.x / 2 );
            this.pos.y -= ( this.size.y / 2 );

        },

        update: function() {

            if(!ig.input.state('click')) {

                // Released click, kill touchpad.
                ig.game.touchpad = null;
                this.kill();

            } else {

                // Calculate distance between entity center and touchpoint.
                var distance_x = ig.input.mouse.x - ( this.pos.x + this.size.x / 2 );
                var distance_y = ig.input.mouse.y - ( this.pos.y + this.size.y / 2 );
                this.distance = Math.sqrt( ( distance_x * distance_x ) + ( distance_y * distance_y ) );

                // Forget the old direction.
                this.direction = null;

                // Is the mouse far enough from the center?
                if(this.distance>=this.sensitivity) {

                    // Calculate angle from entity to touchpoint.
                    var delta_x = ig.input.mouse.x - (this.pos.x + this.size.x / 2);
                    var delta_y = ig.input.mouse.y - (this.pos.y + this.size.y / 2);
                    this.angle_in_degrees = Math.atan2(delta_y, delta_x) * 180 / Math.PI;

                    // Find the new direction.
                    if(this.angle_in_degrees > -135 && this.angle_in_degrees <= -45) this.direction = 'up';
                    else if(this.angle_in_degrees > -45 && this.angle_in_degrees <= 45) this.direction = 'right';
                    else if(this.angle_in_degrees > 45 && this.angle_in_degrees <= 135) this.direction = 'down';
                    else this.direction = 'left';
                }

                // Update the displayed graphic.
                if(this.direction) this.currentAnim = this.anims[this.direction];
                else this.currentAnim = this.anims['none'];

            }

        },

        draw: function() {
            if( this.currentAnim ) {
                this.currentAnim.draw(
                    this.pos.x - this.offset.x,
                    this.pos.y - this.offset.y
                );
            }
        }

    });

});