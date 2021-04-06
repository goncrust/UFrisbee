import { Player } from "../entities/player.js";

class Teams {

    constructor(team_player_count = 5, bounds_blue, bounds_red, ctx) {
        this.size = team_player_count;

        this.team_blue = new Array(team_player_count);
        this.team_red = new Array(team_player_count);

        for (let i = 0; i < team_player_count; i++) {
            let blue_x = Math.floor(Math.random() * (bounds_blue[1][0] - bounds_blue[0][0] + 1)) + bounds_blue[0][0];
            let blue_y = Math.floor(Math.random() * (bounds_blue[1][1] - bounds_blue[0][1] + 1)) + bounds_blue[0][1];

            let red_x = Math.floor(Math.random() * (bounds_red[1][0] - bounds_red[0][0] + 1)) + bounds_red[0][0];
            let red_y = Math.floor(Math.random() * (bounds_red[1][1] - bounds_red[0][1] + 1)) + bounds_red[0][1];

            console.log("blue: " + blue_x + ", " + blue_y);
            console.log("red: " + red_x + ", " + red_y);

            this.team_blue[i] = new Player(blue_x, blue_y, true, "#0000ff", ctx);
            this.team_red[i] = new Player(red_x, red_y, true, "#ff0000", ctx);
        }
    }

}

export { Teams };