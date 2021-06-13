import { vLoader } from "../video_loader.js";
import { iLoader } from "../image_loader.js";
import { scenarios } from "../scenario.js";
import { change_mute_state, mute } from "../../main.js";

class Menu {

    constructor(ctx, scenario, game) {
        this.ctx = ctx;
        this.scenario = scenario;
        this.game = game;

        // 0 -> first menu; 1 -> second menu
        this.menu = 0;

        // reset
        this.next_reset = false;
    }

    render(pause) {

        // main menu
        if (!pause) {
            if (vLoader.getAsset("testVideo").paused || vLoader.getAsset("testVideo").ended) {
                vLoader.getAsset("testVideo").play();
            }

            this.ctx.drawImage(vLoader.getAsset("testVideo"), 0, 0, 800, 600);

            // main menu
            if (this.menu == 0) {
                this.ctx.drawImage(iLoader.getAsset("options"), 550, 485, 200, 50);
                this.ctx.drawImage(iLoader.getAsset("singleplayer"), 50, 485, 200, 50);
                this.ctx.drawImage(iLoader.getAsset("multiplayer"), 300, 485, 200, 50);
                this.ctx.drawImage(iLoader.getAsset("logo"), 70, 50);
                // main menu options
            } else if (this.menu == 1) {
                if (mute) {
                    this.ctx.drawImage(iLoader.getAsset("unmute"), 300, 175, 200, 50);
                } else {
                    this.ctx.drawImage(iLoader.getAsset("mute"), 300, 175, 200, 50);
                }

                this.ctx.drawImage(iLoader.getAsset("back"), 300, 375, 200, 50);
            }
        }

        // pause menu
        else {
            if (vLoader.getAsset("testVideo").paused || vLoader.getAsset("testVideo").ended) {
                vLoader.getAsset("testVideo").play();
            }

            this.ctx.drawImage(vLoader.getAsset("testVideo"), 0, 0, 800, 600);

            // pause menu
            if (this.menu == 0) {
                this.ctx.drawImage(iLoader.getAsset("resume"), 300, 175, 200, 50);
                this.ctx.drawImage(iLoader.getAsset("options"), 300, 275, 200, 50);
                this.ctx.drawImage(iLoader.getAsset("exit"), 300, 375, 200, 50);

                // pause menu options
            } else if (this.menu == 1) {
                if (mute) {
                    this.ctx.drawImage(iLoader.getAsset("unmute"), 300, 175, 200, 50);
                } else {
                    this.ctx.drawImage(iLoader.getAsset("mute"), 300, 175, 200, 50);
                }

                this.ctx.drawImage(iLoader.getAsset("back"), 300, 375, 200, 50);
            }

        }
    }

    logic(last_clicked, clicked, last_clicked_was_left, last_b_clicked, clicked_b, pause) {

        // handle left mouse clicks
        if (clicked && last_clicked_was_left) {

            // main menu
            if (!pause) {

                if (this.menu == 0) {

                    // options buttons
                    if (last_clicked[0] > 550 && last_clicked[0] < 750 && last_clicked[1] > 485 && last_clicked[1] < 535) {
                        this.menu = 1;
                    }

                    // single-player
                    else if (last_clicked[0] > 50 && last_clicked[0] < 250 && last_clicked[1] > 485 && last_clicked[1] < 535) {
                        this.menu = 0;
                        if (this.next_reset)
                            this.game.reset();
                        vLoader.getAsset("blue_coin").play();
                        vLoader.getAsset("red_coin").play();
                        this.scenario.setCurrent(scenarios.game_sp);
                    }

                    // multi-player
                    else if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 485 && last_clicked[1] < 535) {
                        this.menu = 0;
                        if (this.next_reset)
                            this.game.reset();
                        vLoader.getAsset("blue_coin").play();
                        vLoader.getAsset("red_coin").play();
                        this.scenario.setCurrent(scenarios.game_lmp);
                    }

                    // options menu
                } else if (this.menu == 1) {

                    // mute/unmute button
                    if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 175 && last_clicked[1] < 225) {
                        change_mute_state();
                    }

                    // back
                    if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 375 && last_clicked[1] < 425) {
                        this.menu = 0;
                    }
                }

            }

            // pause menu
            else {
                if (this.menu == 0) {

                    // options button
                    if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 275 && last_clicked[1] < 325) {
                        this.menu = 1;
                    }

                    // resume button
                    else if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 175 && last_clicked[1] < 225) {
                        this.menu = 0;
                        this.scenario.setCurrent(scenarios.game_lmp);
                    }

                    // exit button
                    else if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 375 && last_clicked[1] < 425) {
                        this.menu = 0;
                        this.next_reset = true;
                        this.scenario.setCurrent(scenarios.menu);
                    }

                    // options menu
                } else if (this.menu == 1) {

                    // mute/unmute button
                    if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 175 && last_clicked[1] < 225) {
                        change_mute_state();
                    }
                    // back
                    if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 375 && last_clicked[1] < 425) {
                        this.menu = 0;
                    }
                }

            }


        }

        // handle key clicks
        if (clicked_b) {

            // main menu
            if (!pause) {

            }

            // pause menu
            else {

                if (last_b_clicked == "Escape" || last_b_clicked == "p" || last_b_clicked == "P") {
                    this.menu = 0;
                    this.scenario.setCurrent(scenarios.game_lmp);
                }

            }

        }

    }

}

export { Menu };