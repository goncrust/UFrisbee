import { vLoader } from "../video_loader.js";
import { iLoader } from "../image_loader.js";
import { scenarios } from "../scenario.js";

class Menu {

    constructor(ctx, scenario) {
        this.ctx = ctx;
        this.scenario = scenario;

        // 0 -> first menu; 1 -> second menu
        this.menu = 0;
    }

    render(pause) {

        // main menu
        if (!pause) {
            if (vLoader.getAsset("testVideo").paused || vLoader.getAsset("testVideo").ended) {
                vLoader.getAsset("testVideo").play();
            }

            this.ctx.drawImage(vLoader.getAsset("testVideo"), 0, 0, 800, 600);

            if (this.menu == 0) {
                this.ctx.drawImage(iLoader.getAsset("options"), 550, 485, 200, 50);
                this.ctx.drawImage(iLoader.getAsset("singleplayer"), 50, 485, 200, 50);
                this.ctx.drawImage(iLoader.getAsset("multiplayer"), 300, 485, 200, 50);
                this.ctx.drawImage(iLoader.getAsset("logo"), 70, 50);
                //this.ctx.drawImage(iLoader.getAsset("pause"), 550, 50, 50, 50);
            } else if (this.menu == 1) {
                this.ctx.drawImage(iLoader.getAsset("arrow_left"), 20, 485, 100, 100);
            }
        }

        // pause menu
        else {
            // printWin.document.open();
            // printWin.document.write(windowContent);
            // printWin.document.close();
            // printWin.focus();
            // printWin.print();
            // printWin.close();
        }
    }

    logic(last_clicked, clicked, last_b_clicked, clicked_b, pause) {

        // handle mouse clicks
        if (clicked) {

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
                        this.scenario.setCurrent(scenarios.game);
                    }

                    // multi-player
                    else if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 485 && last_clicked[1] < 535) {
                        this.menu = 0;
                        this.scenario.setCurrent(scenarios.game);
                    }

                    // options menu
                } else if (this.menu == 1) {

                    // back
                    if (last_clicked[0] > 20 && last_clicked[0] < 120 && last_clicked[1] > 485 && last_clicked[1] < 585) {
                        this.menu = 0;
                    }
                }

            }

            // pause menu
            else {

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
                    this.scenario.setCurrent(scenarios.game);
                }

            }

        }

    }

}

export { Menu };