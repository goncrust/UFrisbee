/*
UFrisbee (https://github.com/goncrust/UFrisbee)

Entity player.

Copyright (c) 2021 by goncrust
Released under the GPL v3.0
https://github.com/goncrust/UFrisbee/blob/main/LICENSE
*/

import { Entity } from "./entity.js";
import { radius_colision_with_field } from "../util/util.js";

class Player extends Entity {

    constructor(x, y, visible, color, color_selected, field_boundaries, frisbee, ctx) {
        if (x == undefined) {
            x = 0;
        }

        if (y == undefined) {
            y = 0;
        }

        if (visible == undefined) {
            visible = true;
        }

        super(x, y, visible, ctx);
        this.color = color;
        this.color_selected = color_selected;

        this.frisbee = frisbee;

        this.selected = false;

        this.radius_colision_angles = radius_colision_with_field(this.getCoords(), Player.move_radius, field_boundaries[0][0], field_boundaries[1][0], field_boundaries[0][1], field_boundaries[1][1]);
    }

    render() {
        if (this.visible) {
            this.ctx.beginPath();

            this.ctx.arc(this.x, this.y, Player.player_radius, 0, 2 * Math.PI, false);

            // selected player color
            if (this.selected) {
                this.ctx.fillStyle = this.color_selected;
            } else {
                this.ctx.fillStyle = this.color;
            }

            this.ctx.fill();

            this.ctx.closePath();

            // selected player move radius
            if (this.selected) {
                if (this.frisbee.getPlayer() != this) {
                    this.ctx.beginPath();

                    if (this.radius_colision_angles[0] != undefined && this.radius_colision_angles[1] != undefined && this.radius_colision_angles[2] == undefined && this.radius_colision_angles[3] == undefined) {
                        this.ctx.arc(this.x, this.y, Player.move_radius, this.radius_colision_angles[0], this.radius_colision_angles[1], true);

                        this.ctx.strokeStyle = "#000000";
                        this.ctx.lineWidth = 3;

                        this.ctx.stroke();

                        this.ctx.closePath();
                    } else if (this.radius_colision_angles[0] != undefined && this.radius_colision_angles[1] != undefined && this.radius_colision_angles[2] != undefined && this.radius_colision_angles[3] != undefined) {
                        this.ctx.arc(this.x, this.y, Player.move_radius, this.radius_colision_angles[0], this.radius_colision_angles[1], true);

                        this.ctx.strokeStyle = "#000000";
                        this.ctx.lineWidth = 3;

                        this.ctx.stroke();

                        this.ctx.closePath();

                        this.ctx.beginPath();

                        this.ctx.arc(this.x, this.y, Player.move_radius, this.radius_colision_angles[2], this.radius_colision_angles[3], true);

                        this.ctx.strokeStyle = "#000000";
                        this.ctx.lineWidth = 3;

                        this.ctx.stroke();

                        this.ctx.closePath();
                    } else {
                        this.ctx.arc(this.x, this.y, Player.move_radius, 0, 2 * Math.PI, true);

                        this.ctx.strokeStyle = "#000000";
                        this.ctx.lineWidth = 3;

                        this.ctx.stroke();

                        this.ctx.closePath();
                    }
                }
            }
        }
    }

}

Player.player_radius = 10;
Player.move_radius = 170;

export { Player };
