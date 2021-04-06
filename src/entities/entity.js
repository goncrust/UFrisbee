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

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

}

export { Entity };