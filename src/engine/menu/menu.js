import { vLoader } from "../video_loader.js";

class Menu {

    constructor(ctx, event_listener) {
        this.ctx = ctx;
        this.event_listener = event_listener;
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