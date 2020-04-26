import { Position } from "./position";

export class Pixel {
    red: number;
    green: number;
    blue: number;
    alpha: number;

    public constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
}