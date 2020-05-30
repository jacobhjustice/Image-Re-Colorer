import { Cluster } from "./cluster";
import { Pixel } from "./pixel";
import { PixelColorMapping } from "./pixelColorMapping";
import { Color } from "./color";
import { ProcessedImage } from "./processedImage";
// const Pixel = require("./generated/pixel");
// const PixelBag = require("./generated/pixelBag");

export class ImageParser {
    // TODO: reword
    // Every pixel will fall into the closest of k Clusters.
    // When the parser finishes, pixels will be recolored based on the "center point" 
    // pixel within its cluster, resulting in a picture using only k-colors.
    //clusters: Cluster[];

    // The original array of pixels is perserved to maintain order to recreate the image.
    // Since classes work as memory references, 
    // any changes to the pixel within the cluster will be reflected here
    // pixels: Pixel[];

    // The set of all unique PixelColorMappings, indexed with key of the color value, from the set of pixels in the original image.
    // pixels: Map<String, PixelColorMapping>;

    // imageHeight: number;
    // imageWidth: number;

    static imageURL: string = "app/img/test.png"

    static ParseImage(pixelData: number[], imageWidth: number, imageHeight: number, numberOfColors: number): ProcessedImage {
        var pixels = new Map<String, PixelColorMapping>();
        var clusters: Cluster[] = [];
        
        var pixels = this.parsePixels(pixelData, imageWidth, imageHeight);
        var clusters = this.initializeClusters(pixels, numberOfColors);

        clusters = this.fillClusters(pixels, clusters);
        var processedImage = new ProcessedImage(clusters, imageWidth, imageHeight);
        return processedImage;
    }

    private static parsePixels(pixelData: number[], imageWidth: number, imageHeight: number): Map<String, PixelColorMapping> {
        var pixels = new Map<String, PixelColorMapping>();

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

            if(pixels.has(color.Key())) {
                pixels.get(color.Key())?.AddPixel(pixel);
            } else {
                var pcm = new PixelColorMapping(pixel, color);
                pixels.set(color.Key(), pcm);
            }
        } 

        return pixels;
    }

    // Create initialize k-clusters using random pixels as center and buildClusters
    private static initializeClusters(pixels: Map<String, PixelColorMapping>, k: number): Cluster[] {
        var clusters: Cluster[] = [];
        
        var colors: String[] = Array.from(pixels.keys());
        var sample: String[] = [];
        var randValue: String;
        for(var i = 0; i < k; i++) {
            do {
                var randValue = colors[Math.floor(Math.random() * colors.length)];
            } while(sample.indexOf(randValue) != -1);
            sample.push(randValue);
              
            var parts = randValue.split("-")
            var p = new Color(
                Math.floor(parseInt(parts[0])), 
                Math.floor(parseInt(parts[1])), 
                Math.floor(parseInt(parts[2]))
            );
            clusters.push(new Cluster(p));
        }
        return clusters;
    }

    // Place pixels within the closest cluster
    private static fillClusters(pixels: Map<String, PixelColorMapping>, clusters: Cluster[], currentIteration = 1): Cluster[] {        
        var m = new Map<any, any>();
        clusters.forEach((c) => {
            c.ClearPixelBags();
        });
        var p = 0;
        pixels.forEach((pcm) => {
            var minimumCluster: Cluster = clusters[0];
            var minimumDistance = pcm.DistanceFromCluster(minimumCluster);

            m.set(pcm.value.Key(), pcm);

            clusters.forEach((c, i) => {
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
        var wasNotUpdated = this.centerClusters(clusters);

        if(wasNotUpdated || currentIteration > 100) {
            return clusters;
        } 

        return this.fillClusters(pixels, clusters, ++currentIteration);
    }

    // Evaluate a new central point of the cluster
    private static centerClusters(clusters: Cluster[]) {
        var wasNotUpdated = true;
        clusters.forEach((c) => {
            wasNotUpdated = wasNotUpdated && c.UpdateColorByCenteringPixels();
        });
        return wasNotUpdated;
    }
} 

