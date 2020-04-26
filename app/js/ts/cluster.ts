import { Pixel } from "./pixel";

export class Cluster {
    pixels: Pixel[]

    public AddPixel(p: Pixel) {
        this.pixels.push(p);
    }

    public EvaluateMidpointPixelValue() {
        return 
    }
}