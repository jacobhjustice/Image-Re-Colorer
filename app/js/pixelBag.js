const Pixel = require("./pixel");


// A PixelBag contains a list of all identically colored pixels.
// This limits the total number of Pixels for calculations
class PixelBag {

    constructor(pixel) {
        this.pixels = [pixel];
        this.value = new Pixel.Pixel(pixel.red, pixel.green, pixel.blue, pixel.alpha);
    }
    
    // The list of all pixels that will eventually be used
    // Note: The value at any given point on the contents within the Pixels list
    // will not be updated until the algorithm terminates. 
    pixels;

    // A Pixel that represents what the value of every pixel 
    // in the Bag will be updated to upon calling SetPixelsToValue
    value;

    // SetPixelsToValue updates every pixel in the collection to the
    // RGB values that value holds. 
    // Note: Alpha value is perserved.
    SetPixelsToValue() {
        this.pixels.forEach((p) => {
            p.red = value.red;
            p.green = value.green;
            p.blue = value.blue;
        });
    }

    UpdateValue(pixel) {
        this.value = pixel;
    }

    AddPixel(pixel) {
        this.pixels.push(pixel);
    }
}

module.exports.PixelBag = PixelBag;