/*
UFrisbee (https://github.com/goncrust/UFrisbee)

Teams class.

Copyright (c) 2021 by goncrust
Released under the GPL v3.0
https://github.com/goncrust/UFrisbee/blob/main/LICENSE
*/

import { Player } from "../entities/player.js";
import { distance } from "../util/util.js";

class Teams {

    constructor(team_player_count, bounds_blue, bounds_red, field_boundaries, frisbee, ctx) {
        if (team_player_count == undefined) {
            team_player_count = 5;
        }

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

            this.team_blue[i] = new Player(blue_x, blue_y, true, Teams.blue_team_color, Teams.selected_color, field_boundaries, frisbee, ctx);
            this.team_red[i] = new Player(red_x, red_y, true, Teams.red_team_color, Teams.selected_color, field_boundaries, frisbee, ctx);
        }
    }

}

Teams.blue_team_color = "#0000ff";
Teams.red_team_color = "#ba261a";
Teams.selected_color = "#ffffff";

export { Teams };
