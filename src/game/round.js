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

        if (this.moves == 0) {
            this.movement_sequence++;

            if (this.movement_sequence == 2) {
                if (this.current_team == 0) this.current_team = 1;
                else this.current_team = 0;

                this.moves = 5;
            }
        }
    }

    getCurrentTeam() {
        return this.current_team;
    }

}