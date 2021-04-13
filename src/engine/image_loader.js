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
//let iLoader = new ImageLoader("https://goncrust.github.io/UFrisbee/assets");

// images
iLoader.load("field", "field.png");
iLoader.load("options", "options_button.png");
iLoader.load("arrow_left", "arrow_left.png");
iLoader.load("singleplayer", "singleplayer.png");
iLoader.load("multiplayer", "multiplayer.png");
iLoader.load("logo", "logo.png");
iLoader.load("pause", "pause.jpg");
iLoader.load("blue_coin", "blue_coin.png");
iLoader.load("red_coin", "red_coin.png");

export { iLoader }
