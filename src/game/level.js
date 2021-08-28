/*
UFrisbee (https://github.com/goncrust/UFrisbee)

Level data handler.

Copyright (c) 2021 by goncrust
Released under the GPL v3.0
https://github.com/goncrust/UFrisbee/blob/main/LICENSE
*/

import { Player } from "../entities/player.js";

let levels = {};

class Level {

    constructor(name, field_asset_name, field_boundaries, spawn_boundaries) {
        this.name = name;
        this.field_asset_name = field_asset_name;
        this.field_boundaries = field_boundaries;
        this.spawn_boundaries = spawn_boundaries;
    }

}

Level.spawn_offset = Player.player_radius;

levels["main"] = new Level("Main Field", "field", [[66, 121], [733, 478]], [[[66 + Level.spawn_offset, 121 + Level.spawn_offset], [136 - Level.spawn_offset, 478 - Level.spawn_offset]], [[665 + Level.spawn_offset, 121 + Level.spawn_offset], [732 - Level.spawn_offset, 477 - Level.spawn_offset]]]);

export { levels, Level }
