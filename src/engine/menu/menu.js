import { vLoader } from "../video_loader.js";
import { iLoader } from "../image_loader.js";

class Menu {

    constructor(ctx, event_listener) {
        this.ctx = ctx;
        this.event_listener = event_listener;

        // 0 -> first menu; 1 -> second menu
        this.menu = 0;
    }

    render() {
        if (vLoader.getAsset("testVideo").paused || vLoader.getAsset("testVideo").ended) {
            vLoader.getAsset("testVideo").play();
        }

        this.ctx.drawImage(vLoader.getAsset("testVideo"), 0, 0, 800, 600);

        if (this.menu == 0) {
            this.ctx.drawImage(iLoader.getAsset("options"), 550, 485, 200, 50);
            this.ctx.drawImage(iLoader.getAsset("singleplayer"), 50, 485, 200, 50);
            this.ctx.drawImage(iLoader.getAsset("multiplayer"), 300, 485, 200, 50);
            this.ctx.drawImage(iLoader.getAsset("logo"), 70, 50);
        } else if (this.menu == 1) {
            this.ctx.drawImage(iLoader.getAsset("arrow_left"), 20, 485, 100, 100);
        }
    }

    logic(last_clicked) {
        if (last_clicked != undefined) {

            if (this.menu == 0) {
                if (last_clicked[0] > 550 && last_clicked[0] < 750 && last_clicked[1] > 485 && last_clicked[1] < 535) {
                    this.menu = 1;
                }
                if (last_clicked[0] > 50 && last_clicked[0] < 250 && last_clicked[1] > 485 && last_clicked[1] < 535) {
                    this.scenarios = 1;
                }
                if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 485 && last_clicked[1] < 535) {
                    this.scenarios = 1;
                }
            } else if (this.menu == 1) {
                if (last_clicked[0] > 20 && last_clicked[0] < 120 && last_clicked[1] > 485 && last_clicked[1] < 585) {
                    this.menu = 0;
                }
            }

        }
    }

}

export { Menu };