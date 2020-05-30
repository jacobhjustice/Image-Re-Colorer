import { ProcessedImage } from "./processedImage";
import { Cluster } from "./cluster";

const imageParser = require("./ts/generated/imageParser");
const processedImage = require("./ts/generated/processedImage");

class ViewManager {

    img: ProcessedImage
    path: string;
    k: number;
    constructor() {
        this.img = new processedImage.ProcessedImage("", [], 0, 0);
        this.path = "";
        this.k = 0;
    }

    OnChange_FileUpload() {
        
        const getPixels = require("get-pixels");
        var parse = (pixels: number[], w: number, h: number) => {
            this.img = imageParser.ImageParser.ParseImage(pixels, w, h, this.k);
            this.img.WriteImage(this.displayImg)
            this.generateColorPickerHTML(this.img.clusters);
        }

        getPixels(this.path, (err: any, pixels: any) => {
            var imgWidth = pixels.shape[0];
            var imgHeight = pixels.shape[1];
            parse(pixels.data, imgWidth, imgHeight);
        });
    }

    SetFile(files: any) {
        if(files.length > 0) {
            this.path = files[0].path;
        }
    }

    SetK(k: number) {
        this.k = k;
    }

    private generateColorPickerHTML(clusters: Cluster[]) {
        
        clusters.forEach((c, i) => {
            var hex = c.HexColor();
            console.log(hex);
            var img = document.createElement("input");
            img.type = "color";
            img.classList.add("clusterColor")
            img.value = hex;
            img.dataset["cluster"] = "" + i;
            document.body.appendChild(img);
        });
    }

    private displayImg() {
        console.log("SHOW")
        var i = document.createElement("img");
        var url = this != undefined ? this.img.url : "test.png"
        i.src = "img/" + url;

        // TODO: Make image name flexible
        // TODO: Pass image name to system
        // TODO: Make image name different with each go to surpass browser caching
        i.classList.add("parsedImg")
        document.body.appendChild(i);
    }

    // TODO: Stack to keep up with clusters/colors
    public OnChange_ClusterColor() {
        var elements = document.getElementsByClassName("clusterColor");
        var changedIndex = [];
        var clusters = this.img.clusters;
        if(elements != null) {
            elements.forEach((e) => {
                var clusterIndex = parseInt(e.dataset["cluster"]);
                var hex = e.value;
                
                var current = clusters[clusterIndex];
                if(current.HexColor() != hex) {
                    current.UpdateColorByHexCode(hex); // TODO some indicator
                }

            });

            this.img.url = "test22.png";
            this.img.WriteImage(this.displayImg);
        }

    }

       
}

module.exports.ViewManager = new ViewManager();

