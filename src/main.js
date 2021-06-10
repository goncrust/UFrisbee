import { display_fps } from "./engine/engine.js";
import { Menu } from "./engine/menu/menu.js";
import { EventListener } from "./engine/event_listener.js";
import { scenarios, Scenario } from "./engine/scenario.js";
import { Game } from "./game/game.js";
import { vLoader } from "./engine/video_loader.js";
import { iLoader } from "./engine/image_loader.js";

let canvas;
let ctx;
let menu;
let event_listener;
let scenario;
let game;

// clicks
let last_clicked;
let clicked;
let last_clicked_was_left;

let last_b_clicked;
let clicked_b;

document.onload = init();

// initial function
function init() {

    canvas = document.getElementById("display");
    ctx = canvas.getContext("2d");

    event_listener = new EventListener(canvas);
    scenario = new Scenario(scenarios.menu);
    game = new Game(ctx, scenario);
    menu = new Menu(ctx, scenario, game);

    clicked = false;
    clicked_b = false;

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
            menu.render(false);
            break;
        case scenarios.game_lmp:
            game.render();
            break;
        case scenarios.game_sp:
            if (vLoader.getAsset("testVideo").paused || vLoader.getAsset("testVideo").ended) {
                vLoader.getAsset("testVideo").play();
            }

            ctx.drawImage(vLoader.getAsset("testVideo"), 0, 0, 800, 600);
            ctx.drawImage(iLoader.getAsset("back"), 300, 500, 200, 50);

            ctx.beginPath();

            ctx.fillStyle = "#ffffff";
            ctx.font = "32px SegaFont";
            ctx.fillText("Not Available Yet!", 275, 400);

            ctx.closePath();
            break;
        case scenarios.pause:
            menu.render(true);
            break;
    }

    // fps count
    display_fps(ctx, false);
}


// calculate logic
function logic() {

    switch (scenario.getCurrent()) {
        case scenarios.menu:
            menu.logic(last_clicked, clicked, last_clicked_was_left, last_b_clicked, clicked_b, false);
            break;
        case scenarios.game_lmp:
            game.logic(last_clicked, clicked, last_clicked_was_left, last_b_clicked, clicked_b);
            break;
        case scenarios.game_sp:
            if (clicked && last_clicked_was_left) {
                if (last_clicked[0] > 300 && last_clicked[0] < 500 && last_clicked[1] > 500 && last_clicked[1] < 550) {
                    scenario.setCurrent(scenarios.menu);
                }
            }
            break;
        case scenarios.pause:
            menu.logic(last_clicked, clicked, last_clicked_was_left, last_b_clicked, clicked_b, true);
            break;
    }

    clicked = false;
    clicked_b = false;
}

// last_clicked
function update_clicked(coords, left) {
    last_clicked = coords;
    last_clicked_was_left = left;
    clicked = true;
}

// last_b_clicked
function update_b_clicked(button) {
    last_b_clicked = button;
    clicked_b = true;
}

export { update_clicked, update_b_clicked };