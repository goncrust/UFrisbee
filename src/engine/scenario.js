/*
UFrisbee (https://github.com/goncrust/UFrisbee)

Class for scenario tracker.

Copyright (c) 2021 by goncrust
Released under the GPL v3.0
https://github.com/goncrust/UFrisbee/blob/main/LICENSE
*/

const scenarios = {
    menu: 0,
    game_sp: 1,
    game_lmp: 2,
    pause: 3
};

class Scenario {

    constructor(first) {
        this.current = first;
    }

    getCurrent() {
        return this.current;
    }

    setCurrent(scenario) {
        this.current = scenario;
    }

}

export { scenarios, Scenario };
