const ImageParser = require("./js/imageParser");

class ViewManager {

    static OnChange_FileUpload(files) {
        
        const getPixels = require("get-pixels");

        if(files.length > 0) {
            getPixels(files[0].path, (err, pixels) => {
                var imgWidth = pixels.shape[0];
                var imgHeight = pixels.shape[1];
                let i = new ImageParser.ImageParser(pixels.data, imgWidth, imgHeight, 5);
            });
        }
        
    }
}

module.exports.ViewManager = ViewManager;

