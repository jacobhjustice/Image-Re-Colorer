import { Pixel } from "./pixel";
import { PixelBag } from "./pixelBag";


export class Cluster {
    pixels: PixelBag[];
    center: Pixel;

    constructor(center: Pixel) {
        this.pixels = [];
        this.center = center;
    }

    AddPixelBag(p: PixelBag) {
        this.pixels.push(p);
    }

    UpdateCenterValue() {
        this.center = this.center;
    }

    ClearPixelBags() {
        this.pixels = [];
    }
}

