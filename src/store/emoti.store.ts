import Vuex from "vuex";
import { database } from "firebase";
import GeoFire from "geofire";
import firebaseApp from "../firebase.config";
import { Location } from "../location";

const db: database.Database = firebaseApp.database();

export interface IEmoti {
    key?: string | undefined | null;
    location?:Location;
    emote: string;
    timestamp: number;
    uid: string;
}

export interface IEmotiState {
    emotis: IEmoti[];
    center: Location;
    radius: number; // kilometers
}

export class EmotiModule<RootState> implements Vuex.Module<IEmotiState, RootState> {
    namespaced:boolean = true;

    private globalRef:database.Reference = db.ref("global");
    private geofire:GeoFire = new GeoFire(db.ref("global_location"));

    state: IEmotiState = {
        emotis: [],
        center: new Location({lat: 0, long: 0}),
        radius: 0,
    };

    actions: Vuex.ActionTree<IEmotiState, RootState> = {
        "updateRadius": ({commit}, radius:number): void => {
            commit("setRadius", radius);
        },

        "updateCenter": ({commit}, c:Location): void => {
            commit("setCenter", c);
        },

        "post": ({commit}, emoti:IEmoti): Promise<string> => {
            return new Promise(async (resolve, reject)=> {
                const key: string | null = this.globalRef.push().key;
                if(key) {
                    emoti.key = key;
                    emoti.location = await Location.current();

                    const entryRef:database.Reference = this.globalRef.child(key);
                    const entryData: {emote:string, timestamp:number, uid:string} =
                        (({ emote, timestamp, uid }) => ({ emote, timestamp, uid }))(emoti);

                    try {
                        await entryRef.set(entryData);
                        try {
                            await this.geofire.set(key, emoti.location.toLatLong());
                            commit("addEmoti", emoti);
                            resolve();
                        } catch (e) {
                            entryRef.remove();
                            reject(e);
                        }
                    } catch(e) {
                        reject(e);
                    }
                } else {
                    reject("no key received");
                }
            });
        }
    };

    mutations: Vuex.MutationTree<IEmotiState> = {
        "addEmoti": (state:IEmotiState, emoti:IEmoti): void => {
            state.emotis = [...state.emotis, emoti];
        },

        "setCenter": (state:IEmotiState, center:Location): void => {
            state.center = center;
        },

        "setRadius": (state:IEmotiState, radius:number): void => {
            state.radius = radius;
        }
    };
}
