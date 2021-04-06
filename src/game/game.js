import { vLoader } from "../engine/video_loader.js";
import { iLoader } from "../engine/image_loader.js";
import { scenarios } from "../engine/scenario.js";

class Game {

    constructor(ctx, scenario) {
        this.ctx = ctx;
        this.scenario = scenario;
    }

    render() {
        this.ctx.drawImage(iLoader.getAsset("field"), 0, 0, 800, 600);
    }

    logic(last_clicked, clicked, last_b_clicked, clicked_b) {
        // handle mouse clicks
        if (clicked) {

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