const scenarios = {
    menu: 0,
    game: 1
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