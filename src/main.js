import { iLoader } from "./engine/image_loader.js";
import { display_fps } from "./engine/engine.js";
import { Menu } from "./engine/menu/menu.js";
import { EventListener } from "./engine/event_listener.js";
import { scenarios, Scenario } from "./engine/scenario.js";
import { Game } from "./game/game.js";

let canvas;
let ctx;
let menu;
let event_listener;
let scenario;
let game;

// clicks
let last_clicked;

document.onload = init();

// initial function
function init() {

    canvas = document.getElementById("display");
    ctx = canvas.getContext("2d");

    menu = new Menu(ctx);
    event_listener = new EventListener(canvas);
    scenario = new Scenario(scenarios.menu);
    game = new Game(ctx);

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
    switch (scenario.getCurrent()) {
        case scenarios.menu:
            menu.render();
            break;
        case scenarios.game:
            game.render();
            break;
    }

    // fps count
    display_fps(ctx, false);
}


// calculate logic
function logic() {

    switch (scenario.getCurrent()) {
        case scenarios.menu:
            menu.logic(last_clicked);
            break;
        case scenarios.game:
            game.logic();
            break;
    }

}

// last_clicked
function update_clicked(coords) {
    last_clicked = coords;
}

export { update_clicked };