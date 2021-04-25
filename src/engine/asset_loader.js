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