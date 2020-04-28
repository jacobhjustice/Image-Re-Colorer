import { PixelColorMapping } from "./pixelColorMapping";
import { Color } from "./color";


export class Cluster {
    pixels: PixelColorMapping[];
    center: Color;

    constructor(center: Color) {
        this.pixels = [];
        this.center = center;
    }

    AddPixelColorMapping(p: PixelColorMapping) {
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

        this.center = new Color(
            Math.floor(totalRed/this.pixels.length),
            Math.floor(totalGreen/this.pixels.length),
            Math.floor(totalBlue/this.pixels.length)
        );

        return this.center.IsEqual(oldCenter);
    }

    ClearPixelBags() {
        this.pixels = [];
    }
}

