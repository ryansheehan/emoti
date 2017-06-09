import {Location} from "geofire";

export function getCurrentLocation():Promise<Location> {
    return new Promise((resolve, reject)=> {
        if(navigator && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position=>{
                const {latitude:lat, longitude:long} = position.coords;
                resolve([lat,long]);
            }, error=> {
                reject(error);
            })
        } else {
            reject("Geolocation is not available on this device.");
        }
    });
}
