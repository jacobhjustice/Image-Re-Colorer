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
        var totalRed = 0, totalBlue = 0, totalGreen = 0, totalPixels = 0;
        this.pixels.forEach((pb) => {
            totalRed += (pb.value.red * pb.pixels.length);
            totalGreen += (pb.value.green * pb.pixels.length);
            totalBlue += (pb.value.blue * pb.pixels.length);
            totalPixels += pb.pixels.length;
        });

        this.center = new Color(
            Math.floor(totalRed/totalPixels),
            Math.floor(totalGreen/totalPixels),
            Math.floor(totalBlue/totalPixels)
        );

        return this.center.IsEqual(oldCenter);
    }

    ClearPixelBags() {
        this.pixels = [];
    }

    Count(): number {
        var i = 0;
        this.pixels.forEach((pcm) => {
            i += pcm.pixels.length;
        })
        return i;
    }
}

