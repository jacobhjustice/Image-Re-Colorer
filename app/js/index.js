let path = require("path");
let fs = require("fs");

function processImage() {
    var filename = document.getElementById("file").value;
    // var file = path.basename(filename);
    console.log(filename);
    // console.log(file);
    fs.readFile(filename, (f) => {
        console.log(f);
    })
}
