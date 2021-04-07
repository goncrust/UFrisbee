
// h = sqrt((x1-x0)^2 + (y1-y0)^2)
function distance(coords1, coords2) {
    let result = Math.sqrt(Math.pow(coords1[0] - coords2[0], 2) + Math.pow(coords1[1] - coords2[1], 2));

    return result;
}

// (x - xc)^2 + (y - yc)^2 = r^2
function in_radius(coords_t, radius, coords_p) {
    if ((Math.pow(coords_p[0] - coords_t[0], 2) + Math.pow(coords_p[1] - coords_t[1], 2)) <= Math.pow(radius, 2)) {
        return true;
    } else {
        return false;
    }
}

function in_radius_complex(coords_t, radius_start, radius_end, coords_p) {
    let left_equation = (Math.pow(coords_p[0] - coords_t[0], 2) + Math.pow(coords_p[1] - coords_t[1], 2));
    if (left_equation > Math.pow(radius_start, 2) && left_equation <= Math.pow(radius_end, 2)) {
        return true;
    } else {
        return false;
    }
}

export { distance, in_radius, in_radius_complex };