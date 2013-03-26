## Demo ##

http://commins.ca/impact-touchpad/

## What Is It? ##

This is an entity to be used with the ImpactJS framework.

Spawn this entity at the position of a mouse-click event.
So long as the mouse is down, this entity calculates the angle to the mouse and translates this into a direction which can be used as input.

Currently it only captures: UP, DOWN, LEFT, and RIGHT.
It does not calculate diagonal directions, although it would be easy to add them.


## How To Use ##
1. See `/lib/game/main.js` and `/lib/game/entities/touchpad.js` for an example of how to use this.