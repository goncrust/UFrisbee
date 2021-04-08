import { Entity } from "./entity.js";
import { radius_colision_with_field } from "../util/util.js";

class Player extends Entity {

    static player_radius = 10;
    static move_radius = 170;

    constructor(x = 0, y = 0, visible = true, color, color_selected, ctx) {
        super(x, y, visible, ctx);
        this.color = color;
        this.color_selected = color_selected;

        this.selected = false;
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
                let result = radius_colision_with_field(this.getCoords(), Player.move_radius, 66, 733, 121, 478);

                this.ctx.beginPath();

                if (result[0] != undefined && result[1] != undefined && result[2] == undefined && result[3] == undefined) {
                    this.ctx.arc(this.x, this.y, Player.move_radius, result[0], result[1], true);

                    this.ctx.strokeStyle = "#000000";
                    this.ctx.lineWidth = 3;

                    this.ctx.stroke();

                    this.ctx.closePath();
                } else if (result[0] != undefined && result[1] != undefined && result[2] != undefined && result[3] != undefined) {
                    this.ctx.arc(this.x, this.y, Player.move_radius, result[0], result[1], true);

                    this.ctx.strokeStyle = "#000000";
                    this.ctx.lineWidth = 3;

                    this.ctx.stroke();

                    this.ctx.closePath();

                    this.ctx.beginPath();

                    this.ctx.arc(this.x, this.y, Player.move_radius, result[2], result[3], true);

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

export { Player };