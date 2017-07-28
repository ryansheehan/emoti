import {Location as Loc} from "geofire";

interface ILocation {
    lat:number;
    lng:number;
}

export default class Location implements ILocation {
    public lat:number;
    public lng:number;

    constructor({lat, lng}: ILocation) {
        this.lat = lat;
        this.lng = lng;
    }

    static current():Promise<Location> {
        return new Promise((resolve, reject)=> {
            if(navigator && "geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(position=> {
                    const {latitude:lat, longitude:lng} = position.coords;
                    resolve(new Location({lat,lng}));
                }, error=> {
                    reject(error);
                });
            } else {
                reject("Geolocation is not available on this device.");
            }
        });
    }

    clone(): Location {
        return new Location({lat: this.lat, lng: this.lng});
    }

    toLatLong():Loc {
        return [this.lat, this.lng];
    }

    toLongLat():Loc {
        return [this.lng, this.lat];
    }

    static fromLatLong(coord:Loc):Location {
        return new Location({lat:coord[0], lng:coord[1]});
    }

    assignLatLong(coord:Loc):void {
        this.lat = coord[0];
        this.lng = coord[1];
    }

    static fromLongLat(coord:Loc):Location {
        return new Location({lat:coord[1], lng:coord[0]});
    }

    assignLongLat(coord:Loc):void {
        this.lat = coord[1];
        this.lng = coord[0];
    }

    assign(loc:ILocation):void {
        this.lat = loc.lat;
        this.lng = loc.lng;
    }

    equals(loc:ILocation):boolean {
        return this.lat === loc.lat && this.lng === loc.lng;
    }
}


