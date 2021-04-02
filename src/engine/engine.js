let fps = 0;
let lct;
let delta;

function display_fps(ctx) {

    if (lct == undefined || lct == null) {
        lct = Date.now();
        return;
    }

    delta = (Date.now() - lct) / 1000;
    fps = Math.round(1 / delta);

    ctx.font = "15px Arial";
    ctx.fillText(fps, 0, 13);

    lct = Date.now();
}

export { display_fps };