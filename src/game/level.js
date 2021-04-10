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

let spawn_offset = Player.player_radius;

levels["main"] = new Level("Main Field", "field", [[66, 121], [733, 478]], [[[66 + spawn_offset, 121 + spawn_offset], [136 - spawn_offset, 478 - spawn_offset]], [[665 + spawn_offset, 121 + spawn_offset], [732 - spawn_offset, 477 - spawn_offset]]]);

export { levels }