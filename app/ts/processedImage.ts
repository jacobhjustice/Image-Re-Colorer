import { Cluster } from "./cluster";
import { Pixel } from "./pixel";
import { PixelColorMapping } from "./pixelColorMapping";
import { Color } from "./color";
// const Pixel = require("./generated/pixel");
// const PixelBag = require("./generated/pixelBag");

export class ProcessedImage {
    url: string;
    clusters: Cluster[];

    constructor(url: string, clusters: Cluster[], ) {
        this.url = url;
        this.clusters = clusters;
    }
}