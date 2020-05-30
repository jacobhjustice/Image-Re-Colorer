import { Cluster } from "./cluster"


export class Color {
    readonly red: number;
    readonly green: number;
    readonly blue: number;

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
            Math.pow(this.red - other.color.red, 2)
            + Math.pow(this.green - other.color.green, 2)
            + Math.pow(this.blue - other.color.blue, 2)
        );
    }

    IsEqual(other: Color): boolean {
        return this.red == other.red 
            && this.green == other.green
            && this.blue == other.blue;
    }

    HexColor(): string {
        return "#" + 
            this.red.toString(16) + 
            this.green.toString(16) + 
            this.blue.toString(16);
    }
}