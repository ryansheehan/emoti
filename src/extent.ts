import {Location} from "./location";

export class Extent {
    constructor(public min:Location, public max:Location) {

    }

    toArray(): number[] {
        return [this.min.lat, this.min.long, this.max.lat, this.max.long];
    }

    static fromArray(arr: number[]): Extent {
        return new Extent(new Location({lat:arr[0], long:arr[1]}), new Location({lat:arr[2], long:arr[3]}));
    }
}
