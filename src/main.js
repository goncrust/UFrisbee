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
let clicked;

document.onload = init();

// initial function
function init() {

    canvas = document.getElementById("display");
    ctx = canvas.getContext("2d");

    event_listener = new EventListener(canvas);
    scenario = new Scenario(scenarios.menu);
    menu = new Menu(ctx, scenario);
    game = new Game(ctx);

    clicked = false;

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
            menu.logic(last_clicked, clicked);
            break;
        case scenarios.game:
            game.logic();
            break;
    }

    clicked = false;
}

// last_clicked
function update_clicked(coords) {
    last_clicked = coords;
    clicked = true;
}

export { update_clicked };