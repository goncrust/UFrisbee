import { update_clicked } from "../main.js";

class EventListener {

    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.addEventListener("mousedown", function (e) {
            update_clicked(getCursorPosition(e));
        });
    }


}

function getCursorPosition(e) {
    let x = e.clientX - document.getElementById("display").getBoundingClientRect().left;
    let y = e.clientY - document.getElementById("display").getBoundingClientRect().top;
    return [x, y];
}

export { EventListener }