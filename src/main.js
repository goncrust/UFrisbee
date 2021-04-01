import { iLoader } from "./engine/image_loader.js"

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
    ctx.drawImage(iLoader.assets["testImage"], 0, 0);
}

// calculate logic
function logic() {

}