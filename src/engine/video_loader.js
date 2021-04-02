import { AssetLoader } from "./asset_loader.js"

class VideoLoader extends AssetLoader {

    constructor(assetDir) {
        super(assetDir);
    }
    
    
    load(name, file) {
        this.assets[name] = document.createElement("video");
        this.assets[name].src = this.assetDir + "/" + file;
        this.assets[name].play();
        //erro ^|
    }



}

let vLoader = new VideoLoader("../../assets");

// video
vLoader.load("testevideo", "vidtest.mp4");

export { vLoader }
