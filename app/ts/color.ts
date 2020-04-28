import { Cluster } from "./cluster"


export class Color {
    red: number;
    green: number;
    blue: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
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

    IsEqual(other: Color): boolean {
        return this.red == other.red 
            && this.green == other.green
            && this.blue == other.blue;
    }
}