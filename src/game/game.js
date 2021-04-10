import { vLoader } from "../engine/video_loader.js";
import { iLoader } from "../engine/image_loader.js";
import { scenarios } from "../engine/scenario.js";
import { Player } from "../entities/player.js";
import { Teams } from "./teams.js";
import { in_radius, in_radius_complex, radius_colision_with_field } from "../util/util.js";
import { levels } from "./level.js";

class Game {

    constructor(ctx, scenario) {
        this.ctx = ctx;
        this.scenario = scenario;

        this.level = levels["main"];

        this.createTeams();
    }

    change_level(level) {
        this.level = level;
    }

    createTeams() {
        this.teams = new Teams(5, this.level.spawn_boundaries[0], this.level.spawn_boundaries[1], this.level.field_boundaries, this.ctx);
    }

    render() {
        // field
        this.ctx.drawImage(iLoader.getAsset(this.level.field_asset_name), 0, 0, 800, 600);

        // players
        for (let i = 0; i < this.teams.size; i++) {
            this.teams.team_blue[i].render();
            this.teams.team_red[i].render();
        }
    }

    logic(last_clicked, clicked, last_b_clicked, clicked_b) {
        let selected_new = false;

        // handle mouse clicks
        if (clicked) {

            if (last_clicked[0] > 66 && last_clicked[0] < 733 && last_clicked[1] > 121 && last_clicked[1] < 478) {

                // select player
                for (let i = 0; i < this.teams.size; i++) {

                    // for blue team
                    if (!this.teams.team_blue[i].selected) {
                        if (in_radius(this.teams.team_blue[i].getCoords(), Player.player_radius, last_clicked)) {

                            for (let y = 0; y < this.teams.size; y++) {
                                this.teams.team_blue[y].selected = false;
                            }

                            this.teams.team_blue[i].selected = true;
                            selected_new = true;
                        }
                    }

                    // for red team
                    // working...
                }

                // move player
                if (!selected_new) {

                    for (let i = 0; i < this.teams.size; i++) {

                        // for blue team
                        if (this.teams.team_blue[i].selected) {
                            if (in_radius_complex(this.teams.team_blue[i].getCoords(), Player.player_radius, Player.move_radius, last_clicked)) {
                                this.teams.team_blue[i].move(last_clicked[0], last_clicked[1]);
                                this.teams.team_blue[i].selected = false;
                                this.teams.team_blue[i].radius_colision_angles = radius_colision_with_field(this.teams.team_blue[i].getCoords(), Player.move_radius, this.level.field_boundaries[0][0], this.level.field_boundaries[1][0], this.level.field_boundaries[0][1], this.level.field_boundaries[1][1]);
                            }
                        }

                        // for red team
                        // working...
                    }

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