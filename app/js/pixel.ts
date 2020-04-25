class Pixel {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    position: Position;

    constructor(red, green, blue, alpha, x, y) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
        this.position = new Position(x, y)
    }
}