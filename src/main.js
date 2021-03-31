let canvas = document.getElementById("display");
let ctx = canvas.getContext("2d");

document.onload = () => {
    init();
}



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

}

// calculate logic
function logic() {

}