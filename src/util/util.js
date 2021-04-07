
// h = sqrt((x1-x0)^2 + (y1-y0)^2)
function distance(coords1, coords2) {
    let result = Math.sqrt(Math.pow(coords1[0] - coords2[0], 2) + Math.pow(coords1[1] - coords2[1], 2));

    return result;
}

export { distance };