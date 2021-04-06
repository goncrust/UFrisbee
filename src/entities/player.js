import { Entity } from "./entity.js";

class Player extends Entity {

    constructor(x = 0, y = 0, visible = true, color, ctx) {
        super(x, y, visible, ctx);
        this.color = color;
    }

    render() {
        if (this.visible) {
            this.ctx.beginPath();

            this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            //this.ctx.stroke();

            this.ctx.closePath();
        }
    }

}

export { Player };