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

    // returns true if the value remains the same
    UpdateCenterValue(): boolean {
        var oldCenter = this.center 
        var totalRed = 0, totalBlue = 0, totalGreen = 0;
        this.pixels.forEach((pb) => {
            totalRed += pb.value.red;
            totalGreen += pb.value.green;
            totalBlue += pb.value.blue;
        });

        this.center = new Pixel(
            Math.floor(totalRed/this.pixels.length),
            Math.floor(totalGreen/this.pixels.length),
            Math.floor(totalBlue/this.pixels.length),
            -1
        );

        return this.center.IsEqual(oldCenter);
    }

    ClearPixelBags() {
        this.pixels = [];
    }
}

