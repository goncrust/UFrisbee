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