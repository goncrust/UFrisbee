import { Entity } from "./entity.js";
import { Player } from "./player.js";

class Frisbee extends Entity {

    constructor(visible, p_holding, ctx) {

        if (visible == undefined) {
            visible = true;
        }


        super(0, 0, visible, ctx);

        this.c_animating = false;
        this.p_holding = p_holding;
    }

    getPlayer() {
        return this.p_holding;
    }

    pass(player) {

        this.last_x = this.p_holding.getCoords()[0];
        this.last_y = this.p_holding.getCoords()[1];

        this.x_animation_distance = (player.getCoords()[0] - this.p_holding.getCoords()[0]) / Frisbee.animation_divisions;
        this.y_animation_distance = (player.getCoords()[1] - this.p_holding.getCoords()[1]) / Frisbee.animation_divisions;

        this.p_holding = player;

        this.c_animating = true;
        this.c_animation = 0;
    }

    render() {

        if (!this.c_animating) {
            this.ctx.beginPath();

            this.ctx.arc(this.x, this.y, Player.player_radius, 0, 2 * Math.PI, true);

            this.ctx.strokeStyle = Frisbee.color;
            this.ctx.lineWidth = 3;

            this.ctx.stroke();

            this.ctx.closePath();
        } else {
            if (this.c_animation <= Frisbee.animation_divisions) {

                this.ctx.beginPath();

                this.ctx.arc(this.last_x + this.x_animation_distance * this.c_animation, this.last_y + this.y_animation_distance * this.c_animation, Player.player_radius, 0, 2 * Math.PI, true);

                this.ctx.fillStyle = Frisbee.color;
                this.ctx.lineWidth = 3;

                this.ctx.fill();

                this.ctx.closePath();

                this.c_animation += 0.25;
            } else {
                this.c_animating = false;
            }
        }


    }

    logic() {
        this.x = this.p_holding.getCoords()[0];
        this.y = this.p_holding.getCoords()[1];
    }

}

Frisbee.animation_divisions = 10;
//Frisbee.color = "#f542ef";
Frisbee.color = "#e5ff00";


export { Frisbee };