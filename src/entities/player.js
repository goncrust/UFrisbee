import { Entity } from "./entity.js";

class Player extends Entity {

    constructor(x = 0, y = 0, visible = true, color, color_selected, ctx) {
        super(x, y, visible, ctx);
        this.color = color;
        this.color_selected = color_selected;

        this.selected = false;
    }

    render() {
        if (this.visible) {
            this.ctx.beginPath();

            this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);

            if (this.selected) {
                this.ctx.fillStyle = this.color_selected;
            } else {
                this.ctx.fillStyle = this.color;
            }

            this.ctx.fill();
            //this.ctx.stroke();

            this.ctx.closePath();
        }
    }

}

export { Player };