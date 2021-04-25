import { Entity } from "./entity.js";
import { Player } from "./player.js";

class Frisbee extends Entity {

    constructor(visible, p_holding, ctx) {

        if (visible == undefined) {
            visible = true;
        }

        super(0, 0, visible, ctx);

        this.p_holding = p_holding;
    }

    getPlayer() {
        return this.p_holding;
    }

    pass(player) {
        this.p_holding = player;
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