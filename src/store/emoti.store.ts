import Vue from "vue";
import Vuex from "vuex";
import { database } from "firebase";
import GeoFire, { IGeoQuery, IGeoCallbackRegistration, IGeoQueryCriteria } from "geofire";
import firebaseApp from "../firebase.config";
import Location from "../location";

const db: database.Database = firebaseApp.database();

interface IFirebaseEmoti {
    emote: string;
    timestamp: number;
    uid: string;
}


export interface IEmotiLocation {
    location: Location;
    key: string; // a cheat that is helpful for the rendering key
    emotes: {
        emote: string,
        data: IEmoti[]
    }[];
}


export interface IEmotiData {
    location: Location;
    emote: string;
    timestamp: number;
    uid: string;
}

export interface IEmoti extends IEmotiData {
    key: string;
}

export interface IArea {
    center: Location;
    radius: number; // kilometers
}

export interface IEmotiState {
    emotiLocMap : {[loc: string]: {[emoji:string]: IEmoti[]}};
    emotiKeyMap: {[key:string]: string}; // map key => loc
    // emotis: IEmoti[];
    watchArea: IArea;
}

export class EmotiModule<RootState> implements Vuex.Module<IEmotiState, RootState> {
    namespaced: boolean = true;

    private globalRef: database.Reference = db.ref("global");
    private geofire: GeoFire = new GeoFire(db.ref("global_location"));


    private areaQuery: IGeoQuery | null = null;
    private newEmotiRegistration: IGeoCallbackRegistration | null = null;
    private removeEmotiRegistration: IGeoCallbackRegistration | null = null;

    private isRadiusInitialized: boolean = false;
    private isCenterInitialized: boolean = false;

    state: IEmotiState = {
        emotiLocMap: {},
        emotiKeyMap: {},
        // emotis: [],
        watchArea: {
            center: new Location({ lat: 0, lng: 0 }),
            radius: 0,
        }
    };

    getters: Vuex.GetterTree<IEmotiState, RootState> = {
        center(state:IEmotiState): Location {
            return state.watchArea.center;
        },

        radius(state:IEmotiState): number {
            return state.watchArea.radius;
        },

        emotis(state:IEmotiState): IEmotiLocation[] {
            return Object.keys(state.emotiLocMap)
            .map((locKey:string)=> {
                const location:Location = Location.parse(locKey);
                const locData: {[emoji:string]: IEmoti[]} = state.emotiLocMap[locKey];
                const emotes:{emote: string, data: IEmoti[]}[] = Object.keys(locData).map((emote: string)=> ({
                    emote,
                    data: locData[emote]
                }));

                return { location, emotes, key: location.toString() };
            });
        }
    };

    actions: Vuex.ActionTree<IEmotiState, RootState> = {
        "createWatchArea": ({ commit, state }, area: IArea): void => {
            // cancel any existing callbacks
            if (this.newEmotiRegistration) {
                this.newEmotiRegistration.cancel();
                this.newEmotiRegistration = null;
            }

            if (this.removeEmotiRegistration) {
                this.removeEmotiRegistration.cancel();
                this.removeEmotiRegistration = null;
            }

            // cancel any active query
            if (this.areaQuery) {
                this.areaQuery.cancel();
                this.areaQuery = null;
            }

            // clear all data
            commit("clearEmoti");

            // setup the query
            this.areaQuery = this.geofire.query({
                center: area.center.toLatLng(),
                radius: area.radius
            });

            // set a callback for anything that exists or is newly added to the current search
            this.newEmotiRegistration = this.areaQuery.on("key_entered",
                async (key: string, location: [number, number], distance: number): Promise<any> => {
                    let emote: string = "";
                    let timestamp: number = -1;
                    let uid: string = "";

                    try {
                        await this.globalRef.child(key).once("value")
                            .then((data: database.DataSnapshot) => ({ emote, timestamp, uid } = <IFirebaseEmoti>data.val()));

                        commit("addEmoti", {
                            key,
                            emote,
                            timestamp,
                            uid,
                            location: Location.fromLatLng(location)
                        });
                    } catch (e) {
                        console.warn(`Failed to get data at ${key}`);
                    }
                }
            );

            this.removeEmotiRegistration = this.areaQuery.on("key_exited",
                (key: string, location: [number, number], distance: number): void => {
                    const loc: Location = Location.fromLatLng(location);
                    if(state.emotiLocMap[loc.toString()]) {
                        commit("removeLocation", loc);
                    }
                }
            );
        },

        "updateRadius": ({ commit, dispatch, state }, radius: number): void => {
            if (radius !== state.watchArea.radius) {
                commit("setRadius", radius);
                this.isRadiusInitialized = true;
                if(this.areaQuery) {
                    const criteria: IGeoQueryCriteria = {
                        center: this.areaQuery.center(),
                        radius: state.watchArea.radius
                    };
                    this.areaQuery.updateCriteria(criteria);
                } else {
                    if(this.isCenterInitialized) {
                        dispatch("createWatchArea", {
                            radius: state.watchArea.radius,
                            center: state.watchArea.center
                        });
                    }
                }
            }
        },

        "updateCenter": ({ commit, dispatch, state }, c: Location): void => {
            if (c.lat !== state.watchArea.center.lat || c.lng !== state.watchArea.center.lng) {
                commit("setCenter", c);
                this.isCenterInitialized = true;
                if(this.areaQuery) {
                    const criteria: IGeoQueryCriteria = {
                        center: state.watchArea.center.toLatLng(),
                        radius: this.areaQuery.radius()
                    };
                    this.areaQuery.updateCriteria(criteria);
                } else {
                    if(this.isRadiusInitialized) {
                        dispatch("createWatchArea", {
                            radius: state.watchArea.radius,
                            center: state.watchArea.center
                        });
                    }
                }
            }
        },

        "post": ({ commit }, emotiLike: IEmoti | Promise<IEmoti>): Promise<string> => {
            return new Promise(async (resolve, reject) => {
                let emoti:IEmoti | null = null;
                try {
                    emoti = await Promise.resolve(emotiLike);
                } catch(e) {
                    return reject("Unable to resolve emoti");
                }

                const key: string | null = this.globalRef.push().key;
                if (key) {
                    emoti.key = key;

                    const entryRef: database.Reference = this.globalRef.child(key);
                    const entryData: { emote: string, timestamp: number, uid: string } =
                        (({ emote, timestamp, uid }) => ({ emote, timestamp, uid }))(emoti);

                    try {
                        await entryRef.set(entryData);
                        try {
                            await this.geofire.set(key, emoti.location.toLatLng());
                            resolve();
                        } catch (e) {
                            entryRef.remove();
                            reject(e);
                        }
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject("no key received");
                }
            });
        }
    };

    mutations: Vuex.MutationTree<IEmotiState> = {
        "addEmoti": (state: IEmotiState, emoti: IEmoti): void => {
            // state.emotis = [...state.emotis, emoti];

            const locStr:string = emoti.location.toString();

            let locEntry: {[emoji:string]: IEmoti[]} = state.emotiLocMap[locStr];
            if(!locEntry) {
                locEntry = {};
                // state.emotiLocMap[locStr] = locEntry;
                Vue.set(state.emotiLocMap, locStr, locEntry);
            }

            let emoteBlock: IEmoti[] = locEntry[emoti.emote];
            if(!emoteBlock) {
                emoteBlock = [];
                // locEntry[emoti.emote] = emoteBlock;
                Vue.set(state.emotiLocMap[locStr], emoti.emote, emoteBlock);
            }

            Vue.set(state.emotiLocMap[locStr], emoti.emote, [...emoteBlock, emoti]);
            // state.emotiLocMap[locStr][emoti.emote] = [...emoteBlock, emoti];
            Vue.set(state.emotiKeyMap, emoti.key, locStr);
            // state.emotiKeyMap[emoti.key] = locStr;
        },

        "removeEmoti": (state:IEmotiState, payload: {emoti: IEmoti, index: number}): void => {
            const {emoti, index} = payload;
            const locStr: string = state.emotiKeyMap[emoti.key];
            const collection: IEmoti[] = state.emotiLocMap[locStr][emoti.emote];
            // state.emotiLocMap[locStr][emoti.emote] = [
            //     ...collection.slice(0, index),
            //     ...collection.slice(index + 1)
            // ];
            Vue.set(state.emotiLocMap[locStr], emoti.emote, [
                ...collection.slice(0, index),
                ...collection.slice(index + 1)
            ]);

            // clean up any empty constructs
            if(state.emotiLocMap[locStr][emoti.emote].length === 0) {
                // delete state.emotiLocMap[locStr][emoti.emote];
                Vue.delete(state.emotiLocMap[locStr], emoti.emote);
                if(Object.keys(state.emotiLocMap[locStr]).length === 0) {
                    // delete state.emotiLocMap[locStr];
                    Vue.delete(state.emotiLocMap, locStr);
                }
            }

            // delete key
            // delete state.emotiKeyMap[emoti.key];
            Vue.delete(state.emotiKeyMap, emoti.key);
        },

        "removeLocation": (state:IEmotiState, location:Location): void => {
            const locStr: string = location.toString();

            // get and remove all keys at loc
            const emoties:IEmoti[] = [];
            for(let emote in state.emotiLocMap[locStr]) {
                if(state.emotiLocMap[locStr][emote]) {
                    emoties.push(...state.emotiLocMap[locStr][emote]);
                }
            }
            // emoties.forEach(emoti=>delete state.emotiKeyMap[emoti.key]);
            emoties.forEach(emoti=>Vue.delete(state.emotiKeyMap, emoti.key));

            // delete the loc
            // delete state.emotiLocMap[locStr];
            Vue.delete(state.emotiLocMap, locStr);
        },

        "setCenter": (state: IEmotiState, center: Location): void => {
            state.watchArea = { center: center.clone(), radius: state.watchArea.radius };
        },

        "setRadius": (state: IEmotiState, radius: number): void => {
            state.watchArea = { radius, center: state.watchArea.center.clone() };
        },

        "clearEmoti": (state: IEmotiState): void => {
            state.emotiLocMap = {};
            state.emotiKeyMap = {};
        }
    };
}
