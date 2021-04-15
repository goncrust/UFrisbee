import { Entity } from "./entity.js";
import { Player } from "./player.js";

class Frisbee extends Entity {

    constructor(visible = true, p_holding, ctx) {
        super(p_holding.getCoords()[0], p_holding.getCoords()[1], visible, ctx);

        this.p_holding = p_holding;
    }

    getPlayer() {
        return this.p_holding;
    }

    render() {

        this.ctx.beginPath();

        this.ctx.arc(this.x, this.y, Player.player_radius, 0, 2 * Math.PI, true);

        this.ctx.strokeStyle = "#f542ef";
        this.ctx.lineWidth = 3;

        this.ctx.stroke();

        this.ctx.closePath();

    }

    logic() {
        this.x = this.p_holding.getCoords()[0];
        this.y = this.p_holding.getCoords()[1];
    }

}

export { Frisbee };