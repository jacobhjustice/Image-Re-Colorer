const imageParser = require("./ts/generated/imageParser");

class ViewManager {

    static OnChange_FileUpload(files: any) {
        
        const getPixels = require("get-pixels");

        if(files.length > 0) {
            getPixels(files[0].path, (err: any, pixels: any) => {
                var imgWidth = pixels.shape[0];
                var imgHeight = pixels.shape[1];
                let i = imageParser.ImageParser.ParseImage(pixels.data, imgWidth, imgHeight, 6);
            });
        }
        
    }
}

module.exports.ViewManager = ViewManager;

