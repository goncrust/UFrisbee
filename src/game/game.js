import { vLoader } from "../engine/video_loader.js";
import { iLoader } from "../engine/image_loader.js";

class Game {

    constructor(ctx) {
        this.ctx = ctx;
    }

    render() {
        this.ctx.drawImage(iLoader.getAsset("field"), 0, 0, 800, 600);
    }

    logic() {

    }
}

export { Game };