declare module "geofire" {
    import { database } from "firebase";

    export type Location = [number, number]; // ["lat", "long"]

    export type GeoQueryEvent = "ready" | "key_entered" | "key_exited" | "key_moved";

    type voidFunc = ()=>void;
    type argFunc = (key:string, location:Location, distance:number)=>void

    export type GeoQueryCallback = Function | argFunc;

    export interface IGeoQueryCriteria {
        center: Location;
        radius: number;
    }

    export interface IGeoCallbackRegistration {
        cancel():void;
    }

    export interface IGeoQuery {
        center():Location;
        radius():number;
        updateCriteria(criteria:IGeoQueryCriteria):void;
        on(eventType:GeoQueryEvent, callback:GeoQueryCallback):IGeoCallbackRegistration;
        cancel():void;
    }

    export default class GeoFire {
        constructor (dbRef:database.Reference);
        ref():database.Reference;
        get(key:string):Promise<Location|null>;
        set(keyOrLocations:string|{[key:string]:Location|null}, location?:Location):Promise<any>;
        remove(key:string):Promise<any>;
        query(criteria:IGeoQueryCriteria):IGeoQuery;

        static distance(loc1:Location, loc2:Location):number;
    }
}
