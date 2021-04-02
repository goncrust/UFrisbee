import { iLoader } from "./engine/image_loader.js";
import { vLoader } from "./engine/video_loader.js";
import { display_fps } from "./engine/engine.js";

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

    //if (vLoader.getAsset("testVideo").paused || vLoader.getAsset("testVideo").ended) {
        //vLoader.getAsset("testVideo").play();
    //}

    //ctx.drawImage(vLoader.getAsset("testVideo"), 0, 0, 800, 600);

    //ctx.drawImage(iLoader.getAsset("field"), 0, 0, 800, 600);

    display_fps(ctx);
}


// calculate logic
function logic() {




}