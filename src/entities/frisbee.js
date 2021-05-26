import { Entity } from "./entity.js";
import { Player } from "./player.js";
import { in_radius, in_radius_complex, radius_colision_with_field } from "../util/util.js";

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

    pass(player, team) {

        this.last_x = this.p_holding.getCoords()[0];
        this.last_y = this.p_holding.getCoords()[1];

        this.last_team = team;
        this.tested_intersect = false;

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

                let temp_x = this.last_x + this.x_animation_distance * this.c_animation;
                let temp_y = this.last_y + this.y_animation_distance * this.c_animation;

                if (!this.tested_intersect) {
                    for (let i = 0; i < this.teams.size; i++) {
                        if (this.last_team == 0) {
                            if (in_radius([temp_x, temp_y], 20, this.teams.team_red[i].getCoords())) {
                                this.tested_intersect = true;
                                let rand = Math.random();
                                console.log(rand);
                                if (rand < 0.77) {
                                    this.p_holding = this.teams.team_red[i];
                                    this.c_animating = false;
                                    this.round_manager.reset_wteam(1);
                                }
                            }
                        } else if (this.last_team == 1) {
                            if (in_radius([temp_x, temp_y], 20, this.teams.team_blue[i].getCoords())) {
                                this.tested_intersect = true;
                                let rand = Math.random();
                                console.log(rand);
                                if (rand < 0.77) {
                                    this.p_holding = this.teams.team_blue[i];
                                    this.c_animating = false;
                                    this.round_manager.reset_wteam(0);
                                }
                            }
                        }
                    }
                }

                this.ctx.beginPath();

                this.ctx.arc(temp_x, temp_y, Player.player_radius, 0, 2 * Math.PI, true);

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