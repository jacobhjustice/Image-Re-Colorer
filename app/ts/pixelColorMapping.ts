import {Pixel} from "./pixel";
import {Cluster} from "./cluster";
import { Color } from "./color";

// A PixelColorMapping is logically the collection of all the pixels in an image that share the same color
// In this application, PixelColorMapping serves the purpose of keeping track of the color (RGB) over a set of pixels (position)
export class PixelColorMapping {

    constructor(pixel: Pixel, color: Color) {
        this.pixels = [pixel];
        this.value = color;
    }
    
    // The list of all pixels that share a given color
    pixels: Pixel[];

    // A Color that represents the RGB value of the physical pixels in the image
    value: Color;

    // // SetPixelsToValue updates every pixel in the collection to the
    // // RGB values that value holds. 
    // // Note: Alpha value is perserved.
    // SetPixelsToValue() {
    //     this.pixels.forEach((p) => {
    //         p.red = this.value.red;
    //         p.green = this.value.green;
    //         p.blue = this.value.blue;
    //     });
    // }

    // UpdateValue(pixel: Pixel) {
    //     this.value = pixel;
    // }

    AddPixel(pixel: Pixel) {
        this.pixels.push(pixel);
    }

    DistanceFromCluster(other: Cluster): number {
        return this.value.DistanceFromCluster(other);
    } 
}

