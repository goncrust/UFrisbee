class AssetLoader {

    assets = {};

    constructor(assetDir) {
        this.assetDir = assetDir;
    }

    getAsset(name) {
        return this.assets[name];
    }

}

export { AssetLoader };