import { Cluster } from "./cluster";
import { Pixel } from "./pixel";
import { PixelBag } from "./pixelBag";
// const Pixel = require("./generated/pixel");
// const PixelBag = require("./generated/pixelBag");

export class ImageParser {

    // TODO: reword
    // Every pixel will fall into the closest of k Clusters.
    // When the parser finishes, pixels will be recolored based on the "center point" 
    // pixel within its cluster, resulting in a picture using only k-colors.
    clusters: Cluster[];

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
        
        this.initializeClusters(numberOfColors);

    }

    // Create initialize k-clusters using random pixels as center and buildClusters
    private initializeClusters(k: number) {
        for(var i = 0; i < k; i++) {
            var p = new Pixel(
                Math.floor(Math.random()*256), 
                Math.floor(Math.random()*256), 
                Math.floor(Math.random()*256), 
                -1
            );
            this.clusters.push(new Cluster(p));
        }

        this.fillClusters();
    }

    // Place pixels within the closest cluster
    private fillClusters() {
        this.clusters.forEach((c) => {
            c.ClearPixelBags();
        });
        this.pixelBags.forEach((pb) => {
            var minimumDistance = Infinity;
            var minimumCluster: Cluster = this.clusters[0];
            this.clusters.forEach((c) => {
                var testDistance = pb.DistanceFromCluster(c);
                if(testDistance < minimumDistance) {
                    minimumCluster = c;
                    minimumDistance = testDistance;
                }
            });

            minimumCluster.AddPixelBag(pb)
        });

        this.centerClusters();
    }

    // Evaluate a new central point of the cluster
    private centerClusters() {
    
    }
} 

