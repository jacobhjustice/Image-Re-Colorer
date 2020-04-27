import {Pixel} from "./pixel";


// A PixelBag contains a list of all identically colored pixels.
// This limits the total number of Pixels for calculations
export class PixelBag {

    constructor(pixel: Pixel) {
        this.pixels = [pixel];
        this.value = new Pixel(pixel.red, pixel.green, pixel.blue, pixel.alpha);
    }
    
    // The list of all pixels that will eventually be used
    // Note: The value at any given point on the contents within the Pixels list
    // will not be updated until the algorithm terminates. 
    pixels: Pixel[];

    // A Pixel that represents what the value of every pixel 
    // in the Bag will be updated to upon calling SetPixelsToValue
    value: Pixel;

    // SetPixelsToValue updates every pixel in the collection to the
    // RGB values that value holds. 
    // Note: Alpha value is perserved.
    SetPixelsToValue() {
        this.pixels.forEach((p) => {
            p.red = this.value.red;
            p.green = this.value.green;
            p.blue = this.value.blue;
        });
    }

    UpdateValue(pixel: Pixel) {
        this.value = pixel;
    }

    AddPixel(pixel: Pixel) {
        this.pixels.push(pixel);
    }
}

