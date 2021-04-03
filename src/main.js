import { iLoader } from "./engine/image_loader.js";
import { display_fps } from "./engine/engine.js";
import { Menu } from "./engine/menu/menu.js";
import { EventListener } from "./engine/event_listener.js";

let canvas;
let ctx;
let menu;
let event_listener;

// clicks
let last_clicked;

document.onload = init();

// initial function
function init() {

    canvas = document.getElementById("display");
    ctx = canvas.getContext("2d");

    menu = new Menu(ctx);

    event_listener = new EventListener(canvas);

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
    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // render scenario
    //menu.render();
    ctx.drawImage(iLoader.getAsset("field"), 0, 0, 800, 600);

    // fps count
    display_fps(ctx, false);
}


// calculate logic
function logic() {

    menu.logic(last_clicked);

}

// last_clicked
function update_clicked(coords) {
    last_clicked = coords;
}

export { update_clicked };