import { PixelColorMapping } from "./pixelColorMapping";
import { Color } from "./color";


export class Cluster {
    pixels: PixelColorMapping[];
    color: Color;

    constructor(center: Color) {
        this.pixels = [];
        this.color = center;
    }

    AddPixelColorMapping(p: PixelColorMapping) {
        this.pixels.push(p);
    }

    // returns true if the value remains the same
    UpdateColorByCenteringPixels(): boolean {
        var oldCenter = this.color 
        var totalRed = 0, totalBlue = 0, totalGreen = 0, totalPixels = 0;
        this.pixels.forEach((pb) => {
            totalRed += (pb.value.red * pb.pixels.length);
            totalGreen += (pb.value.green * pb.pixels.length);
            totalBlue += (pb.value.blue * pb.pixels.length);
            totalPixels += pb.pixels.length;
        });

        
        this.color = new Color(
            Math.floor(totalRed/totalPixels),
            Math.floor(totalGreen/totalPixels),
            Math.floor(totalBlue/totalPixels)
        );

        return this.color.IsEqual(oldCenter);
    }

    UpdateColorByHexCode(hex: string) {
        if(hex.length != 7) {
            return; // TODO: error
        }
        debugger;
        var red = hex.substr(1,2);
        var green = hex.substr(3,2);
        var blue = hex.substr(5,2);

        function hexToDecimal(str: string) {
            str = "0x" + str;
            return parseInt(str, 16);
        }

        this.color = new Color(hexToDecimal(red), hexToDecimal(green), hexToDecimal(blue));
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

    HexColor(): string {
        return this.color.HexColor();
    }

}

