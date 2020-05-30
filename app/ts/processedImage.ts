import { Cluster } from "./cluster";
import { Pixel } from "./pixel";
import { PixelColorMapping } from "./pixelColorMapping";
import { Color } from "./color";
// const Pixel = require("./generated/pixel");
// const PixelBag = require("./generated/pixelBag");

export class ProcessedImage {
    url: string;
    clusters: Cluster[];
    imageWidth: number;
    imageHeight: number;
    isWritten: boolean;

    constructor(url: string, clusters: Cluster[], imageWidth: number, imageHeight: number ) {
        this.url = url;
        this.clusters = clusters;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.isWritten = false;
    }

    WriteImage(cb: Function) {
        const Jimp = require('jimp');
        const url = this.url;
        const clusters = this.clusters;

        this.isWritten = false; 
        var onComplete = (err: string) => { 
            this.isWritten = true;
            cb(err != null);
        }
        
        var image = new Jimp(this.imageWidth, this.imageHeight, function(err: string, img: any) {
            clusters.forEach((c, i0) => {
                let color = c.color;
                c.pixels.forEach((pcm, i1) => { 
                    pcm.pixels.forEach((p, i2) => {    
                        image.setPixelColor(Jimp.rgbaToInt(color.red,color.green,color.blue,255), 
                        p.xPos, p.yPos);
                    });
                }); 
            });

            image.write(url, (err: string) => {
                onComplete(err);
            });
        });
    }
}