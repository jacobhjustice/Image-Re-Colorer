import { Cluster } from "./cluster";
import { Pixel } from "./pixel";
import { PixelColorMapping } from "./pixelColorMapping";
import { Color } from "./color";
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
    // pixels: Pixel[];

    // The set of all unique PixelColorMappings, indexed with key of the color value, from the set of pixels in the original image.
    pixels: Map<String, PixelColorMapping>;

    imageHeight: number;
    imageWidth: number;

    constructor(pixelData: number[], imageWidth: number, imageHeight: number, numberOfColors: number) {
        this.imageHeight = imageHeight;
        this.imageWidth = imageWidth;
        //this.pixels = [];
        this.pixels = new Map<String, PixelColorMapping>();
        this.clusters = [];
        this.log("START LOAD")
        for(var i = 0; i < pixelData.length; i+=4) {
            var xPos = Math.floor(i/4) % imageWidth;
            var yPos = Math.floor(Math.floor(i/4)/imageHeight);
            var color = new Color(
                pixelData[i],
                pixelData[i+1],
                pixelData[i+2]
            );
            if(pixelData[i+3] != 255) {
                console.log("ALPHA IFFY")
            }

            var pixel = new Pixel(xPos,yPos);
           // this.pixels.push(p);

            if(this.pixels.has(color.Key())) {
                this.pixels.get(color.Key())?.AddPixel(pixel);
            } else {
                var pcm = new PixelColorMapping(pixel, color);
                this.pixels.set(color.Key(), pcm);
            }
        } 

        this.log("END LOAD")

        
        this.initializeClusters(numberOfColors);

    }

    // Create initialize k-clusters using random pixels as center and buildClusters
    private initializeClusters(k: number) {
        for(var i = 0; i < k; i++) {
            var p = new Color(
                Math.floor(Math.random()*256), 
                Math.floor(Math.random()*256), 
                Math.floor(Math.random()*256)
            );
            this.clusters.push(new Cluster(p));
        }

        this.fillClusters();
    }

    // Place pixels within the closest cluster
    private fillClusters() {
        console.log("Fill!");
        this.clusters.forEach((c) => {
            c.ClearPixelBags();
        });
        this.pixels.forEach((pcm) => {
            var minimumDistance = Infinity;
            var minimumCluster: Cluster = this.clusters[0];
            this.clusters.forEach((c) => {
                var testDistance = pcm.DistanceFromCluster(c);
                if(testDistance < minimumDistance) {
                    minimumCluster = c;
                    minimumDistance = testDistance;
                }
            });

            minimumCluster.AddPixelColorMapping(pcm);
        });

        var wasUpdated = false//!this.centerClusters();

        if(wasUpdated) {
            this.fillClusters();
        } else {
            this.writeImage();
        }
        console.log(this.clusters);
        console.log("FINISHED!")
        
    }

    // Evaluate a new central point of the cluster
    private centerClusters() {
        console.log("Center!");
        var wasNotUpdated = true;
        this.clusters.forEach((c) => {
            wasNotUpdated = wasNotUpdated && c.UpdateCenterValue();
        });

        return wasNotUpdated;
    }

    private log(msg: string) {
        console.log(new Date());
        console.log(msg);
        console.log("____________________");
    }

    private writeImage() {
        const Jimp = require('jimp');
        var self = this;
        // TODO: type
        this.log("START GENERATE")

        var image = new Jimp(this.imageWidth, this.imageHeight, function(err: string, img: any) {
            var m = new Map<string, number>();
            
            self.clusters.forEach((c) => {
                // TODO: error in same pixel in multiple cluters
                self.pixels.forEach((pcm) => {
                    let color = c.center//pcm.value;
                    pcm.pixels.forEach((p) => {
                        image.setPixelColor(Jimp.rgbaToInt(color.red,color.green,color.blue,255), 
                            p.xPos, p.yPos);
                        //image.setPixelColor(Jimp.rgbaToInt(255,0,0,255), p.xPos, p.yPos)    
                    });
                });
            });
            
            self.log("END GENERATE")

            image.write('test.png', (err: string) => {
                if (err) throw err;
              });
        })
    }
} 

