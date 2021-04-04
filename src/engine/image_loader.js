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
iLoader.load("field", "field.png");
iLoader.load("options", "options_button.png")
iLoader.load("arrow_left", "arrow_left.png")
iLoader.load("singleplayer", "singleplayer.png")
iLoader.load("multiplayer", "multiplayer.png")

export { iLoader }
