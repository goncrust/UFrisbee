const scenarios = {
    menu: 0,
    game: 1,
    pause: 2
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