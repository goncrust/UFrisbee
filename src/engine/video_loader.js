import { AssetLoader } from "./asset_loader.js"

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

export { vLoader }
