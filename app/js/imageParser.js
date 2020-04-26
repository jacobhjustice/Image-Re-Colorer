const path = require('path');
const cluster = require(path.resolve( __dirname,"./js/cluster"));
const pixel = require(path.resolve( __dirname,"./js/pixel"));

class ImageParser {

    // Every pixel will fall into the closest of k Clusters.
    // When the parser finishes, pixels will be recolored based on the "center point" 
    // pixel within its cluster, resulting in a picture using only k-colors.
    clusters;
    k;

    // The original array of pixels is perserved to maintain order to recreate the image.
    // Since classes work as memory references, 
    // any changes to the pixel within the cluster will be reflected here
    pixels;

    imageHeight;
    imageWidth;

    constructor(pixelData, imageWidth, imageHeight, numberOfColors) {
        this.imageHeight = imageHeight;
        this.imageWidth = imageWidth;
        console.log("START");
        for(var i = 0; i < pixelData.length; i+=4) {
            this.pixels.push(new Pixel(
                pixelData[i],
                pixelData[i+1],
                pixelData[i+2],
                pixelData[i+3]
            ));

        }   
        console.log("FINISH!")     
    }

    // // Create initialize k-clusters using random pixels as center and buildClusters
    // initializeClusters() {

    // }

    // // Place pixels within the closest cluster
    // buildClusters() {

    // }

    // // Evaluate a new central point of the cluster
    // centerClusters() {
    
    // }
} 
