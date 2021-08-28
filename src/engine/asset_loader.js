/*
UFrisbee (https://github.com/goncrust/UFrisbee)

Parent class for asset loaders.

Copyright (c) 2021 by goncrust
Released under the GPL v3.0
https://github.com/goncrust/UFrisbee/blob/main/LICENSE
*/

class AssetLoader {

    constructor(assetDir) {
        this.assetDir = assetDir;

        this.assets = {};
    }

    getAsset(name) {
        return this.assets[name];
    }

}

export { AssetLoader };
