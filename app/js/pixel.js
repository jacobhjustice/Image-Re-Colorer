class Pixel {
    red;
    green;
    blue;
    alpha;

    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    Key() {
        return this.red + "-" + this.green + "-" + this.blue
    }
}

module.exports.Pixel = Pixel;