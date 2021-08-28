/*
UFrisbee (https://github.com/goncrust/UFrisbee)

Round state tracker.

Copyright (c) 2021 by goncrust
Released under the GPL v3.0
https://github.com/goncrust/UFrisbee/blob/main/LICENSE
*/



/*
round:
0 team with disk -> 3 movements
1 team defending -> 5 movements
2 team with disk -> 1 movement + throw disk
*/

class Round {

    constructor(disk_team) {
        // 0 -> blue    1 -> red
        this.current_team = disk_team;

        this.movement_sequence = 0;

        this.moves = 3;

        // 0 -> player movement     1 -> throw disk
        this.move_type = 0;
    }

    movement() {
        this.moves--;

        if (this.movement_sequence == 2 && this.moves == 1) {
            this.move_type = 1;
        } else {
            this.move_type = 0;
        }

        if (this.moves == 0) {
            this.movement_sequence++;

            if (this.movement_sequence != 3)
                this.current_team = !this.current_team;

            if (this.movement_sequence == 1) {
                this.moves = 5;
            } else if (this.movement_sequence == 2) {
                this.moves = 2;
            } else if (this.movement_sequence == 3) {
                this.reset();
            }
        }
    }

    reset() {
        this.movement_sequence = 0;
        this.moves = 3;
        this.move_type = 0;
    }

    reset_wteam(team) {
        this.current_team = team;
        this.movement_sequence = 0;
        this.moves = 3;
        this.move_type = 0;
    }

    getCurrentTeam() {
        return this.current_team;
    }

    getMoveType() {
        return this.move_type;
    }

    getMoves() {
        return this.moves;
    }

}

export { Round };
