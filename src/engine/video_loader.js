/*
UFrisbee (https://github.com/goncrust/UFrisbee)

Video loader class and actual video loading.

Copyright (c) 2021 by goncrust and contributors
Released under the GPL v3.0
https://github.com/goncrust/UFrisbee/blob/main/LICENSE
*/

import { AssetLoader } from "./asset_loader.js";

class VideoLoader extends AssetLoader {

    constructor(assetDir) {
        super(assetDir);
    }

    load(name, file) {
        this.assets[name] = document.createElement("video");
        this.assets[name].muted = true;
        this.assets[name].src = this.assetDir + "/" + file;
        this.assets[name].pause();
    }
}

//let vLoader = new VideoLoader("../../assets");
let vLoader = new VideoLoader("https://goncrust.github.io/UFrisbee/assets");

// video
vLoader.load("testVideo", "vidtest.mp4");
vLoader.load("red_coin", "flip_animation_red.mp4");
vLoader.load("blue_coin", "flip_animation_blue.mp4");

export { vLoader }
