/*
UFrisbee (https://github.com/goncrust/UFrisbee)

Parent class for ententies.

Copyright (c) 2021 by goncrust
Released under the GPL v3.0
https://github.com/goncrust/UFrisbee/blob/main/LICENSE
*/

class Entity {

    constructor(x = 0, y = 0, visible = true, ctx) {
        this.x = x;
        this.y = y;
        this.visible = visible;
        this.ctx = ctx;
    }

    setVisible(visibility) {
        this.visible = visibility;
    }

    getCoords() {
        return [this.x, this.y];
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

}

export { Entity };
