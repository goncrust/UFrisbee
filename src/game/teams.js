import { Player } from "../entities/player.js";
import { distance } from "../util/util.js";

class Teams {

    constructor(team_player_count = 5, bounds_blue, bounds_red, field_boundaries, frisbee, ctx) {
        this.team_blue_score = 0;
        this.team_red_score = 0;

        this.size = team_player_count;

        this.team_blue = new Array(team_player_count);
        this.team_red = new Array(team_player_count);


        for (let i = 0; i < team_player_count; i++) {
            let done = false;

            let blue_x;
            let blue_y;

            let red_x;
            let red_y;

            while (!done) {
                blue_x = Math.floor(Math.random() * (bounds_blue[1][0] - bounds_blue[0][0] + 1)) + bounds_blue[0][0];
                blue_y = Math.floor(Math.random() * (bounds_blue[1][1] - bounds_blue[0][1] + 1)) + bounds_blue[0][1];

                red_x = Math.floor(Math.random() * (bounds_red[1][0] - bounds_red[0][0] + 1)) + bounds_red[0][0];
                red_y = Math.floor(Math.random() * (bounds_red[1][1] - bounds_red[0][1] + 1)) + bounds_red[0][1];

                done = true;

                for (let y = 0; y < i; y++) {
                    if (distance([blue_x, blue_y], this.team_blue[y].getCoords()) < Player.player_radius * 2 + 1) {
                        done = false;
                    }

                    if (distance([red_x, red_y], this.team_red[y].getCoords()) < Player.player_radius * 2 + 1) {
                        done = false;
                    }
                }
            }

            // console.log("blue: " + blue_x + ", " + blue_y);
            // console.log("red: " + red_x + ", " + red_y);

            this.team_blue[i] = new Player(blue_x, blue_y, true, "#0000ff", "#ffffff", field_boundaries, frisbee, ctx);
            this.team_red[i] = new Player(red_x, red_y, true, "#ff0000", "#ffffff", field_boundaries, frisbee, ctx);
        }
    }

}

export { Teams };