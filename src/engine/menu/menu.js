import { vLoader } from "../video_loader.js";
import { iLoader } from "../image_loader.js";

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
        
        this.ctx.drawImage(iLoader.getAsset("options"), 680, 485, 100, 100);
    }

    logic(last_clicked) {

    }

}

export { Menu };