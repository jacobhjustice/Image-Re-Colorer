let path = require("path");
let getPixels = require("get-pixels")
let fs = require("fs");

function processImage() {
    var files = document.getElementById("file").files;
    if(files.length > 0) {
        getPixels(files[0].path, (err, pixels) => {
            console.log(err);
            console.log(pixels);
        });
    }
    

    
}
