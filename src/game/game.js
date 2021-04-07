import { vLoader } from "../engine/video_loader.js";
import { iLoader } from "../engine/image_loader.js";
import { scenarios } from "../engine/scenario.js";
import { Teams } from "./teams.js";
import { in_radius } from "../util/util.js";

class Game {

    constructor(ctx, scenario) {
        this.ctx = ctx;
        this.scenario = scenario;

        this.createTeams();
    }

    createTeams() {
        // [[76, 131], [126, 468]] and [[675, 131], [722, 467]]
        this.teams = new Teams(5, [[76, 131], [126, 468]], [[675, 131], [722, 467]], this.ctx);
    }

    render() {
        this.ctx.drawImage(iLoader.getAsset("field"), 0, 0, 800, 600);

        for (let i = 0; i < this.teams.size; i++) {
            this.teams.team_blue[i].render();
            this.teams.team_red[i].render();
        }
    }

    logic(last_clicked, clicked, last_b_clicked, clicked_b) {
        // handle mouse clicks
        if (clicked) {

            for (let i = 0; i < this.teams.size; i++) {
                if (in_radius(this.teams.team_blue[i].getCoords(), 10, last_clicked)) {

                    for (let y = 0; y < this.teams.size; y++) {
                        this.teams.team_blue[y].selected = false;
                    }

                    this.teams.team_blue[i].selected = true;
                }
            }

        }

        // handle key clicks
        if (clicked_b) {

            // pause game
            if (last_b_clicked == "Escape" || last_b_clicked == "p" || last_b_clicked == "P") {
                this.scenario.setCurrent(scenarios.pause);
            }

        }

    }
}

export { Game };