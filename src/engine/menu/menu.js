import { vLoader } from "../video_loader.js";

class Menu {

    constructor(ctx) {
        this.ctx = ctx;
    }

    render() {
        if (vLoader.getAsset("testVideo").paused || vLoader.getAsset("testVideo").ended) {
            vLoader.getAsset("testVideo").play();
        }

        this.ctx.drawImage(vLoader.getAsset("testVideo"), 0, 0, 800, 600);
    }

    logic() {

    }

}

export { Menu };