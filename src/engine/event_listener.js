import { update_clicked, update_b_clicked } from "../main.js";

class EventListener {

    constructor(canvas) {
        this.canvas = canvas;

        this.canvas.addEventListener("mousedown", function (e) {
            if (e.which == 1) {
                update_clicked(getCursorPosition(e), true);
            } else if (e.which == 3) {
                update_clicked(getCursorPosition(e), false);
            }
        });

        this.canvas.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        window.addEventListener("keydown", function (e) {
            update_b_clicked(getKeyPressed(e));
        });
    }


}

function getCursorPosition(e) {
    let x = e.clientX - document.getElementById("display").getBoundingClientRect().left;
    let y = e.clientY - document.getElementById("display").getBoundingClientRect().top;
    return [x, y];
}

function getKeyPressed(e) {
    return e.key;
}

export { EventListener }