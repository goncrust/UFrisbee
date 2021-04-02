import { iLoader } from "./engine/image_loader.js"
import { vLoader } from "./engine/video_loader.js";

let canvas = document.getElementById("display");
let ctx = canvas.getContext("2d");

document.onload = init();

// initial function
function init() {

    window.requestAnimationFrame(mainloop);
}

function mainloop() {
    // mainloop
    logic();

    render();

    window.requestAnimationFrame(mainloop);
}

// render graphics
function render() {

    if (vLoader.assets["testevideo"].paused || vLoader.assets["testevideo"].ended) {
        vLoader.assets["testevideo"].play();
    }

    ctx.drawImage(vLoader.assets["testevideo"], 0, 0, 800, 600);
    // ctx.drawImage(iLoader.assets["testImage"], 0, 0);

}

// calculate logic
function logic() {

}