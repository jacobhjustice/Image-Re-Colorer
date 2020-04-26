let getPixels = require("get-pixels");
let parser = require("./ts/imageParserimageParser");

function processImage() {
    var files = document.getElementById("file").files;
    if(files.length > 0) {
        getPixels(files[0].path, (err, pixels) => {
            console.log(err);
            console.log(pixels);
            var imgWidth = pixels.shape[0];
            var imgHeight = pixels.shape[1];
            parser.ImageParser(pixels.data, imgWidth, imgHeight, 5)
        });
    }
    

    
}
