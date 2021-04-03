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

}

export { scenarios, Scenario };