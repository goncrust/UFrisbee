
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

// x = (-b +- raiz(b^2 -4ac)) / 2a
function second_degree_equation(a, b, c) {
    let delta = Math.pow(b, 2) - (4 * a * c);

    if (!(delta < 0)) {
        let first = (-b + Math.sqrt(delta)) / 2 * a;
        let second = (-b - Math.sqrt(delta)) / 2 * a;
        return [first, second];
    } else {
        return [null, null];
    }
}

/* (x - xc)^2 + (y - yc)^2 = r^2

x^2 - 2xcx + xc^2 + y^2 - 2ycy + yc^2 = r^2
x^2 - 2xcx + xc^2 + y^2 - 2ycy + yc^2 - r^2 = 0
y^2 - 2ycy + yc^2 + x^2 - 2xcx + xc^2 - r^2 = 0
a     b    -> c
*/
function radius_colision_with_field(coords_t, radius, field_x_left, field_x_right, field_y_top, field_y_bot) {

    // for y top
    let a = 1;
    let b = -2 * coords_t[0];
    let c = Math.pow(coords_t[0], 2) + Math.pow(field_y_top, 2) - (2 * coords_t[1] * field_y_top) + Math.pow(coords_t[1], 2) - Math.pow(radius, 2);

    let result_top = second_degree_equation(a, b, c);

    // for y bot
    a = 1;
    b = -2 * coords_t[0];
    c = Math.pow(coords_t[0], 2) + Math.pow(field_y_bot, 2) - (2 * coords_t[1] * field_y_bot) + Math.pow(coords_t[1], 2) - Math.pow(radius, 2);

    let result_bot = second_degree_equation(a, b, c);

    // for x left
    a = 1;
    b = -2 * coords_t[1];
    c = Math.pow(coords_t[1], 2) + Math.pow(field_x_left, 2) - (2 * coords_t[0] * field_x_left) + Math.pow(coords_t[0], 2) - Math.pow(radius, 2);

    let result_left = second_degree_equation(a, b, c);

    // for x right
    a = 1;
    b = -2 * coords_t[1];
    c = Math.pow(coords_t[1], 2) + Math.pow(field_x_right, 2) - (2 * coords_t[0] * field_x_right) + Math.pow(coords_t[0], 2) - Math.pow(radius, 2);

    let result_right = second_degree_equation(a, b, c);

    for (let i = 0; i < 2; i++) {
        if (result_top != null) {
            if (result_top[i] < field_x_left || result_top[i] > field_x_right) {
                result_top[i] = null;
            }
        }

        if (result_bot != null) {
            if (result_bot[i] < field_x_left || result_bot[i] > field_x_right) {
                result_bot[i] = null;
            }
        }

        if (result_left != null) {
            if (result_left[i] < field_y_top || result_left[i] > field_y_bot) {
                result_left[i] = null;
            }
        }

        if (result_right != null) {
            if (result_right[i] < field_y_top || result_right[i] > field_y_bot) {
                result_right[i] = null;
            }
        }

    }

    // sin(a) = co/h <=> a = arcsin(co/h)
    let result_angles = new Array(4);
    let result_angles_top = new Array(2);
    let result_angles_left = new Array(2);
    let result_angles_bot = new Array(2);
    let result_angles_right = new Array(2);

    for (let i = 0; i < 2; i++) {
        if (result_top[i] != null) {
            let co = field_y_top - coords_t[1];
            let h = radius;

            if (result_top[i] > coords_t[0]) {
                result_angles_top[1] = Math.asin(co / h);
            } else {
                result_angles_top[0] = Math.PI - Math.asin(co / h);
            }
        }

        if (result_left[i] != null) {
            let co = result_left[i] - coords_t[1];
            co = (co < 0) ? -co : co;
            let h = radius;

            if (result_left[i] > coords_t[1]) {
                result_angles_left[0] = Math.PI - Math.asin(co / h);
            } else {
                result_angles_left[1] = Math.PI + Math.asin(co / h);
            }
        }

        if (result_bot[i] != null) {
            let co = coords_t[1] - field_y_bot;
            let h = radius;

            if (result_bot[i] < coords_t[0]) {
                result_angles_bot[1] = Math.PI + Math.asin(co / h);
            } else {
                result_angles_bot[0] = Math.PI * 2 - Math.asin(co / h);
            }
        }

        if (result_right[i] != null) {
            let co = result_right[i] - coords_t[1];
            co = (co < 0) ? -co : co;
            let h = radius;

            if (result_right[i] < coords_t[1]) {
                result_angles_right[0] = Math.PI * 2 - Math.asin(co / h);
            } else {
                result_angles_right[1] = Math.asin(co / h);
            }
        }

    }

    if (verify_all_not_undefined(result_angles_top, result_angles_left)) {
        result_angles[0] = result_angles_top[0];
        result_angles[1] = result_angles_left[1];
        result_angles[2] = result_angles_left[0];
        result_angles[3] = result_angles_top[1];
    } else if (verify_all_not_undefined(result_angles_left, result_angles_bot)) {
        result_angles[0] = result_angles_left[0];
        result_angles[1] = result_angles_bot[1];
        result_angles[2] = result_angles_bot[0];
        result_angles[3] = result_angles_left[1];

        // not working
    } else if (verify_all_not_undefined(result_angles_bot, result_angles_right)) {
        result_angles[0] = result_angles_bot[0];
        result_angles[1] = result_angles_right[1];
        result_angles[2] = result_angles_right[0];
        result_angles[3] = result_angles_bot[1];

        // not working
    } else if (verify_all_not_undefined(result_angles_right, result_angles_top)) {
        result_angles[0] = result_angles_right[0];
        result_angles[1] = result_angles_top[1];
        result_angles[2] = result_angles_top[0];
        result_angles[3] = result_angles_right[1];
    } else if (verify_all_not_undefined(result_angles_top)) {
        result_angles[0] = result_angles_top[0];
        result_angles[1] = result_angles_top[1];
    } else if (verify_all_not_undefined(result_angles_left)) {
        result_angles[0] = result_angles_left[0];
        result_angles[1] = result_angles_left[1];
    } else if (verify_all_not_undefined(result_angles_bot)) {
        result_angles[0] = result_angles_bot[0];
        result_angles[1] = result_angles_bot[1];
    } else if (verify_all_not_undefined(result_angles_right)) {
        result_angles[0] = result_angles_right[0];
        result_angles[1] = result_angles_right[1];
    } else if (result_angles_left[0] != undefined && result_angles_top[1] != undefined) {
        result_angles[0] = result_angles_left[0];
        result_angles[1] = result_angles_top[1];
    } else if (result_angles_bot[0] != undefined && result_angles_left[1] != undefined) {
        result_angles[0] = result_angles_bot[0];
        result_angles[1] = result_angles_left[1];
    } else if (result_angles_right[0] != undefined && result_angles_bot[1] != undefined) {
        result_angles[0] = result_angles_right[0];
        result_angles[1] = result_angles_bot[1];
    } else if (result_angles_top[0] != undefined && result_angles_right[1] != undefined) {
        result_angles[0] = result_angles_top[0];
        result_angles[1] = result_angles_right[1];
    }

    console.log(result_angles);
    return result_angles;
}

function verify_all_not_undefined() {
    let successful = true;

    for (let i = 0; i < arguments.length; i++) {
        if (Array.isArray(arguments[i])) {
            for (let y = 0; y < arguments[i].length; y++) {
                if (arguments[i][y] == undefined) {
                    successful = false;
                }
            }
        } else {
            if (arguments[i] == undefined) {
                successful = false;
            }
        }
    }

    if (successful) {
        return true;
    } else {
        return false;
    }

}

export { distance, in_radius, in_radius_complex, radius_colision_with_field };