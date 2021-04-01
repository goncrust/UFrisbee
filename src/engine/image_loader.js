import { AssetLoader } from "./asset_loader.js"

class ImageLoader extends AssetLoader {

    constructor(assetDir) {
        super(assetDir);
    }

    load(name, file) {
        this.assets[name] = new Image();
        this.assets[name].src = this.assetDir + "/" + file;
    }
}

let iLoader = new ImageLoader("../../assets");

// images
iLoader.load("testImage", "test.png");

export { iLoader }