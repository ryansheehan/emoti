import {Location as Loc} from "geofire";

interface ILocation {
    lat:number;
    long:number;
}

export class Location implements ILocation {
    public lat:number;
    public long:number;

    constructor({lat, long}: ILocation) {
        this.lat = lat;
        this.long = long;
    }

    toLatLong():Loc {
        return [this.lat, this.long];
    }

    toLongLat():Loc {
        return [this.long, this.lat];
    }

    static fromLatLong(coord:Loc):Location {
        return new Location({lat:coord[0], long:coord[1]});
    }

    assignLatLong(coord:Loc):void {
        this.lat = coord[0];
        this.long = coord[1];
    }

    static fromLongLat(coord:Loc):Location {
        return new Location({lat:coord[1], long:coord[0]});
    }

    assignLongLat(coord:Loc):void {
        this.lat = coord[1];
        this.long = coord[0];
    }

    assign(loc:ILocation):void {
        this.lat = loc.lat;
        this.long = loc.long;
    }

    equals(loc:ILocation):boolean {
        return this.lat === loc.lat && this.long === loc.long;
    }
}


export function getCurrentLocation():Promise<Location> {
    return new Promise((resolve, reject)=> {
        if(navigator && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position=> {
                const {latitude:lat, longitude:long} = position.coords;
                resolve(new Location({lat,long}));
            }, error=> {
                reject(error);
            });
        } else {
            reject("Geolocation is not available on this device.");
        }
    });
}

