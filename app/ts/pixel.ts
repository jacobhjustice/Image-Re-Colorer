import { Cluster } from "./cluster"

export class Pixel {
    red: number;
    green: number;
    blue: number;
    alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    Key(): string {
        return this.red + "-" + this.green + "-" + this.blue
    }

    DistanceFromCluster(other: Cluster): number {
        return Math.sqrt(
            Math.pow(this.red - other.center.red, 2)
            + Math.pow(this.green - other.center.green, 2)
            + Math.pow(this.blue - other.center.blue, 2)
        );
    }
}

