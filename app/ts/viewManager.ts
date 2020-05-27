import { ProcessedImage } from "./processedImage";

const imageParser = require("./ts/generated/imageParser");
const processedImage = require("./ts/generated/processedImage");

class ViewManager {

    img: ProcessedImage

    constructor() {
        this.img = new processedImage.ProcessedImage("", [], 0, 0);
    }

    OnChange_FileUpload(files: any) {
        
        const getPixels = require("get-pixels");
        var parse = (pixels: number[], w: number, h: number) => {
            this.img = imageParser.ImageParser.ParseImage(pixels, w, h, 5);
            this.img.WriteImage(this.displayImg)
        }
        if(files.length > 0) {
            getPixels(files[0].path, (err: any, pixels: any) => {
                var imgWidth = pixels.shape[0];
                var imgHeight = pixels.shape[1];
                parse(pixels.data, imgWidth, imgHeight);
            });
        } 
    }

    private displayImg() {
        console.log("SHOW")
        var i = document.createElement("img");
        i.src = "img/test.png"//this.img.url;
        i.classList.add("parsedImg")
        document.body.appendChild(i);
    }
}

module.exports.ViewManager = new ViewManager();

