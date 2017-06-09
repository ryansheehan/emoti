import Vuex from "vuex";
import { database } from "firebase";
import GeoFire, {Location} from "geofire";
import firebaseApp from "../firebase.config";
import { getCurrentLocation } from "../location";

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
}

export class EmotiModule<RootState> implements Vuex.Module<IEmotiState, RootState> {
    namespaced:boolean = true;

    private globalRef:database.Reference = db.ref("global");
    private geofire:GeoFire = new GeoFire(db.ref("global_location"));

    state: IEmotiState = {
        emotis: [],
    };

    actions: Vuex.ActionTree<IEmotiState, RootState> = {
        "post": ({commit}, emoti:IEmoti): Promise<string> => {
            return new Promise(async (resolve, reject)=> {
                const key: string | null = this.globalRef.push().key;
                if(key) {
                    emoti.key = key;
                    emoti.location = await getCurrentLocation();

                    const entryRef:database.Reference = this.globalRef.child(key);
                    const entryData: {emote:string, timestamp:number, uid:string} =
                        (({ emote, timestamp, uid }) => ({ emote, timestamp, uid }))(emoti);

                    try {
                        await entryRef.set(entryData);
                        try {
                            await this.geofire.set(key, emoti.location);
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
        "addEmoti": (state:IEmotiState, emoti:IEmoti): any => {
            state.emotis = [...state.emotis, emoti];
        }
    };
}
