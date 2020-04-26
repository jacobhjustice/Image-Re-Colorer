

class ViewManager {

    OnChange_FileUpload(files) {
        
        const getPixels = require("get-pixels");
        const imageParser = require("./node_modules/imageParser");

        if(files.length > 0) {
            getPixels(files[0].path, (err, pixels) => {
                var imgWidth = pixels.shape[0];
                var imgHeight = pixels.shape[1];
                console.log(ImageParser);
                let i = new imageParser.ImageParser(pixels.data, imgWidth, imgHeight, 5);
            });
        }
        
    }
}

