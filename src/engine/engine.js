/*
UFrisbee (https://github.com/goncrust/UFrisbee)

Engine functions.

Copyright (c) 2021 by goncrust and contributors
Released under the GPL v3.0
https://github.com/goncrust/UFrisbee/blob/main/LICENSE
*/

let fps = 0;
let lct;
let delta;

function display_fps(ctx, print) {

    if (lct == undefined || lct == null) {
        lct = Date.now();
        return;
    }

    delta = (Date.now() - lct) / 1000;
    fps = Math.round(1 / delta);

    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(fps, 0, 13);

    if (print) {
        console.log("FPS: " + fps);
    }

    lct = Date.now();
}

export { display_fps };
