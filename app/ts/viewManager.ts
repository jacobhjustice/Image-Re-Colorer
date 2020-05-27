import { ProcessedImage } from "./processedImage";

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
        }

        getPixels(this.path, (err: any, pixels: any) => {
            var imgWidth = pixels.shape[0];
            var imgHeight = pixels.shape[1];
            parse(pixels.data, imgWidth, imgHeight);
        });
    }

    private displayImg() {
        console.log("SHOW")
        var i = document.createElement("img");
        i.src = "img/test.png"//this.img.url;
        i.classList.add("parsedImg")
        document.body.appendChild(i);
    }

    SetFile(files: any) {
        if(files.length > 0) {
            this.path = files[0].path;
        }
    }

    SetK(k: number) {
        this.k = k;
    }
}

module.exports.ViewManager = new ViewManager();

