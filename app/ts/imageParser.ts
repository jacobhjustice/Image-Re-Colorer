import { Cluster } from "./cluster";
import { Pixel } from "./pixel";
import { PixelBag } from "./pixelBag";
// const Pixel = require("./generated/pixel");
// const PixelBag = require("./generated/pixelBag");

export class ImageParser {

    // Every pixel will fall into the closest of k Clusters.
    // When the parser finishes, pixels will be recolored based on the "center point" 
    // pixel within its cluster, resulting in a picture using only k-colors.
    clusters: Cluster[];
    k: number;

    // The original array of pixels is perserved to maintain order to recreate the image.
    // Since classes work as memory references, 
    // any changes to the pixel within the cluster will be reflected here
    pixels: Pixel[];

    // The set of all unique PixelBags, indexed with key of the pixel value, that Pixels equates to.
    // Note: A PixelBag makes up the set of all Pixels with the same RGB value
    pixelBags: Map<String, PixelBag>;

    imageHeight: number;
    imageWidth: number;

    constructor(pixelData: number[], imageWidth: number, imageHeight: number, numberOfColors: number) {
        this.imageHeight = imageHeight;
        this.imageWidth = imageWidth;
        this.pixels = [];
        this.pixelBags = new Map<String, PixelBag>();
        this.clusters = [];
        this.k = numberOfColors;
        
        let map = [];
        console.log("START 1")
        console.log(new Date())
        for(var i = 0; i < pixelData.length; i+=4) {
            var p = new Pixel(
                pixelData[i],
                pixelData[i+1],
                pixelData[i+2],
                pixelData[i+3]
            )
            this.pixels.push(p);

            if(this.pixelBags.has(p.Key())) {
                this.pixelBags.get(p.Key())?.AddPixel(p);
            } else {
                var bag = new PixelBag(p);
                this.pixelBags.set(p.Key(), bag);
            }
        }   
        console.log("END 1")
        console.log(new Date())

        console.log(Object.keys(this.pixelBags).length);
        console.log(this.pixels.length);

        console.log("START 2")
        console.log(new Date())
        for(var key in this.pixelBags) {
            var t = this.pixelBags.get(key)
            console.log(t);
        }

        console.log("End 2")
        console.log(new Date())
    }

    // Create initialize k-clusters using random pixels as center and buildClusters
    initializeClusters() {

    }

    // Place pixels within the closest cluster
    buildClusters() {

    }

    // Evaluate a new central point of the cluster
    centerClusters() {
    
    }
} 

