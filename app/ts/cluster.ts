import { Pixel } from "./pixel";


export class Cluster {
    pixels: Pixel[]

    constructor() {
        this.pixels = [];
    }

    AddPixel(p: Pixel) {
        this.pixels.push(p);
    }

    EvaluateMidpointPixelValue() {
        return 
    }
}

