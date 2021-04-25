import { vLoader } from "../engine/video_loader.js";
import { iLoader } from "../engine/image_loader.js";
import { scenarios } from "../engine/scenario.js";
import { Player } from "../entities/player.js";
import { Teams } from "./teams.js";
import { in_radius, in_radius_complex, radius_colision_with_field } from "../util/util.js";
import { levels } from "./level.js";
import { Frisbee } from "../entities/frisbee.js";

class Game {

    constructor(ctx, scenario) {
        this.ctx = ctx;
        this.scenario = scenario;

        this.level = levels["main"];
        this.createFrisbee();
        this.createTeams();
        this.pickTeam();
    }

    reset() {
        this.level = levels["main"];
        this.createFrisbee();
        this.createTeams();
        this.pickTeam();
    }

    pickTeam() {
        // team 0 is blue, 1 is red

        let rand = Math.random();

        if (rand < 0.5) {
            this.team = 0;
        } else {
            this.team = 1;
        }

        this.animation = true;
    }

    change_level(level) {
        this.level = level;
    }

    createTeams() {
        this.teams = new Teams(5, this.level.spawn_boundaries[0], this.level.spawn_boundaries[1], this.level.field_boundaries, this.frisbee, this.ctx);
        this.frisbee.p_holding = this.teams.team_blue[this.frisbee.p_holding];
    }

    createFrisbee() {
        let rand_player_index = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
        this.frisbee = new Frisbee(true, rand_player_index, this.ctx);
    }

    render() {

        // field
        this.ctx.drawImage(iLoader.getAsset(this.level.field_asset_name), 0, 0, 800, 600);

        // players
        for (let i = 0; i < this.teams.size; i++) {
            this.teams.team_blue[i].render();
            this.teams.team_red[i].render();
        }

        // coin flip animation
        if (this.animation) {
            if (this.team == 0) {

                if (vLoader.getAsset("blue_coin").ended) {
                    this.animation = false;
                    vLoader.getAsset("blue_coin").play();
                }

                if (vLoader.getAsset("blue_coin").paused) {
                    vLoader.getAsset("blue_coin").play();
                }

                this.ctx.drawImage(vLoader.getAsset("blue_coin"), 720, 15, 65, 55);

            } else {

                if (vLoader.getAsset("red_coin").ended) {
                    this.animation = false;
                    vLoader.getAsset("red_coin").play();
                }

                if (vLoader.getAsset("red_coin").paused) {
                    vLoader.getAsset("red_coin").play();
                }

                this.ctx.drawImage(vLoader.getAsset("red_coin"), 720, 15, 65, 55);

            }
        }

        if (!this.animation) {
            if (this.team == 0) {
                this.ctx.drawImage(iLoader.getAsset("blue_coin"), 720, 15, 65, 55);
            } else {
                this.ctx.drawImage(iLoader.getAsset("red_coin"), 720, 15, 65, 55);
            }
        }

        // frisbee
        this.frisbee.render();
    }

    logic(last_clicked, clicked, last_clicked_was_left, last_b_clicked, clicked_b) {
        let selected_new = false;

        if (!this.animation) {

            // handle left mouse clicks
            if (clicked && last_clicked_was_left) {

                if (last_clicked[0] > 66 && last_clicked[0] < 733 && last_clicked[1] > 121 && last_clicked[1] < 478) {

                    // select player
                    for (let i = 0; i < this.teams.size; i++) {

                        // for blue team
                        if (this.team == 0) {
                            if (!this.teams.team_blue[i].selected) {
                                if (in_radius(this.teams.team_blue[i].getCoords(), Player.player_radius, last_clicked)) {

                                    for (let y = 0; y < this.teams.size; y++) {
                                        this.teams.team_blue[y].selected = false;
                                    }

                                    this.teams.team_blue[i].selected = true;
                                    selected_new = true;
                                }
                            }
                        }

                        // for red team
                        if (this.team == 1) {
                            if (!this.teams.team_red[i].selected) {
                                if (in_radius(this.teams.team_red[i].getCoords(), Player.player_radius, last_clicked)) {

                                    for (let y = 0; y < this.teams.size; y++) {
                                        this.teams.team_red[y].selected = false;
                                    }

                                    this.teams.team_red[i].selected = true;
                                    selected_new = true;
                                }
                            }
                        }
                    }

                    // move player
                    if (!selected_new) {

                        for (let i = 0; i < this.teams.size; i++) {

                            // for blue team
                            if (this.team == 0) {
                                if (this.teams.team_blue[i].selected) {
                                    if (this.frisbee.getPlayer() != this.teams.team_blue[i]) {
                                        if (in_radius_complex(this.teams.team_blue[i].getCoords(), Player.player_radius, Player.move_radius, last_clicked)) {
                                            this.teams.team_blue[i].move(last_clicked[0], last_clicked[1]);
                                            this.teams.team_blue[i].selected = false;
                                            this.teams.team_blue[i].radius_colision_angles = radius_colision_with_field(this.teams.team_blue[i].getCoords(), Player.move_radius, this.level.field_boundaries[0][0], this.level.field_boundaries[1][0], this.level.field_boundaries[0][1], this.level.field_boundaries[1][1]);
                                        }
                                    }
                                }
                            }

                            // for red team
                            if (this.team == 1) {
                                if (this.teams.team_red[i].selected) {
                                    if (this.frisbee.getPlayer() != this.teams.team_red[i]) {
                                        if (in_radius_complex(this.teams.team_red[i].getCoords(), Player.player_radius, Player.move_radius, last_clicked)) {
                                            this.teams.team_red[i].move(last_clicked[0], last_clicked[1]);
                                            this.teams.team_red[i].selected = false;
                                            this.teams.team_red[i].radius_colision_angles = radius_colision_with_field(this.teams.team_red[i].getCoords(), Player.move_radius, this.level.field_boundaries[0][0], this.level.field_boundaries[1][0], this.level.field_boundaries[0][1], this.level.field_boundaries[1][1]);
                                        }
                                    }
                                }
                            }
                        }

                    }
                }

            } else if (clicked && !last_clicked_was_left) {

                // pass the frisbee
                // for blue team
                if (this.team == 0) {
                    if (this.frisbee.getPlayer().selected) {
                        for (let i = 0; i < this.teams.size; i++) {
                            if (this.frisbee.getPlayer() != this.teams.team_blue[i]) {
                                if (in_radius(this.teams.team_blue[i].getCoords(), Player.player_radius, last_clicked)) {
                                    this.frisbee.getPlayer().selected = false;
                                    this.frisbee.pass(this.teams.team_blue[i]);
                                }
                            }
                        }
                    }

                    // for red team
                    else if (this.team == 1) {
                        if (this.frisbee.getPlayer() != this.teams.team_red[i]) {
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

        this.frisbee.logic();

    }
}

export { Game };