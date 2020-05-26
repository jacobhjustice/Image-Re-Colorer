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
        this.pixels = new Map<String, PixelColorMapping>();
        this.clusters = [];

        var allColors = [];

        this.log("START LOAD")
        for(var i = 0; i < pixelData.length; i+=4) {
            var index = Math.floor(i/4)
            var xPos = index % imageWidth;
            var yPos = Math.floor(index/imageWidth);

            var color = new Color(
                pixelData[i],
                pixelData[i+1],
                pixelData[i+2]
            );

            var pixel = new Pixel(xPos,yPos);

            if(this.pixels.has(color.Key())) {
                this.pixels.get(color.Key())?.AddPixel(pixel);
            } else {
                allColors.push(color);

                var pcm = new PixelColorMapping(pixel, color);
                this.pixels.set(color.Key(), pcm);
            }
        } 

        this.log("END LOAD")

        //this.testWrite()
        this.initializeClusters(numberOfColors, allColors);

    }

    // Create initialize k-clusters using random pixels as center and buildClusters
    private initializeClusters(k: number, colors: Color[]) {
        for(var i = 0; i < k; i++) {
            var randValue = colors[colors.length - 1 - i];
            var p = new Color(
                Math.floor(randValue.red), 
                Math.floor(randValue.green), 
                Math.floor(randValue.blue)
            );
            this.clusters.push(new Cluster(p));
        }

        this.fillClusters();
    }

    // Place pixels within the closest cluster
    private fillClusters(currentIteration = 1) {        
        var m = new Map<any, any>();
        this.clusters.forEach((c) => {
            c.ClearPixelBags();
        });
        var p = 0;
        this.pixels.forEach((pcm) => {
            var minimumCluster: Cluster = this.clusters[0];
            var minimumDistance = pcm.DistanceFromCluster(minimumCluster);

            m.set(pcm.value.Key(), pcm);

            this.clusters.forEach((c, i) => {
                if(i == 0) {
                    return;
                } 
                var testDistance = pcm.DistanceFromCluster(c);
                if(testDistance < minimumDistance) {
                    minimumCluster = c;
                    minimumDistance = testDistance;
                }
            });
            p++;
            minimumCluster.AddPixelColorMapping(pcm);
        });
        this.logClusters();
        var wasNotUpdated = this.centerClusters();

        if(wasNotUpdated || currentIteration > 100) {
            this.log("Final iteration count: " + currentIteration)
            this.writeImage();
        } else {
            this.fillClusters(++currentIteration);
        }

        
    }

    private logClusters() {
        this.log("Starting cluster log");
        this.clusters.forEach((c) => {
            console.log(c.center.Key());
            console.log(c.pixels.length)
        });
    }

    // Evaluate a new central point of the cluster
    private centerClusters() {
        this.log("Center!");
        var wasNotUpdated = true;
        this.clusters.forEach((c) => {
            wasNotUpdated = wasNotUpdated && c.UpdateCenterValue();
        });
        return wasNotUpdated;
    }

    private log(msg: string) {
        console.log("____________________");
        console.log(new Date());
        console.log(msg);

    }

    private writeImage() {
        const Jimp = require('jimp');
        var self = this;
        // TODO: type
        this.log("START GENERATE")

        var image = new Jimp(this.imageWidth, this.imageHeight, function(err: string, img: any) {
            var m = new Map<string, number>();
            var i = 0;
            self.clusters.forEach((c, i0) => {
                let color = c.center;

                c.pixels.forEach((pcm, i1) => { 
                    pcm.pixels.forEach((p, i2) => {    
                        image.setPixelColor(Jimp.rgbaToInt(color.red,color.green,color.blue,255), 
                        p.xPos, p.yPos);
                    });
                }); 
            });

            
            self.log("END GENERATE")

            image.write('test.png', (err: string) => {
                if (err) throw err;
              });
        })
    }

    private testWrite(pcm: PixelColorMapping[]) {
        const Jimp = require('jimp');
        var image = new Jimp(this.imageWidth, this.imageHeight, function(err: string, img: any) {

            pcm.forEach((p) => {
                p.pixels.forEach((pi) => {
                    image.setPixelColor(Jimp.rgbaToInt(p.value.red,p.value.green,p.value.blue,255), 
                                pi.xPos, pi.yPos);
                });
            });
            image.write('test.png', (err: string) => {
                if (err) throw err;
              });
        })

        
    }
} 

