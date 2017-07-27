import Vuex from "vuex";
import { database } from "firebase";
import GeoFire, { IGeoQuery, IGeoCallbackRegistration, IGeoQueryCriteria } from "geofire";
import firebaseApp from "../firebase.config";
import { Location } from "../location";

const db: database.Database = firebaseApp.database();

interface IFirebaseEmoti {
    emote: string;
    timestamp: number;
    uid: string;
}

export interface IEmoti {
    key?: string | undefined | null;
    location?: Location;
    emote: string;
    timestamp: number;
    uid: string;
}

export interface IArea {
    center: Location;
    radius: number; // kilometers
}

export interface IEmotiState {
    emotis: IEmoti[];
    watchArea: IArea;
}

export class EmotiModule<RootState> implements Vuex.Module<IEmotiState, RootState> {
    namespaced: boolean = true;

    private globalRef: database.Reference = db.ref("global");
    private geofire: GeoFire = new GeoFire(db.ref("global_location"));


    private areaQuery: IGeoQuery | null = null;
    private newEmotiRegistration: IGeoCallbackRegistration | null = null;

    private isRadiusInitialized: boolean = false;
    private isCenterInitialized: boolean = false;

    state: IEmotiState = {
        emotis: [],
        watchArea: {
            center: new Location({ lat: 0, long: 0 }),
            radius: 0,
        }
    };

    actions: Vuex.ActionTree<IEmotiState, RootState> = {
        "createWatchArea": ({ commit }, area: IArea): void => {
            // cancel any existing callbacks
            if (this.newEmotiRegistration) {
                this.newEmotiRegistration.cancel();
                this.newEmotiRegistration = null;
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
                center: area.center.toLatLong(),
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
                            location: Location.fromLatLong(location)
                        });
                    } catch (e) {
                        console.warn(`Failed to get data at ${key}`);
                    }
                }
            );

            // this.areaQuery.on("key_exited", (key: string, location: [number, number], distance: number): void => {
            // });
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
            if (c.lat !== state.watchArea.center.lat || c.long !== state.watchArea.center.long) {
                commit("setCenter", c.clone());
                this.isCenterInitialized = true;
                if(this.areaQuery) {
                    const criteria: IGeoQueryCriteria = {
                        center: state.watchArea.center.toLatLong(),
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

        "post": ({ commit }, emoti: IEmoti): Promise<string> => {
            return new Promise(async (resolve, reject) => {
                const key: string | null = this.globalRef.push().key;
                if (key) {
                    emoti.key = key;
                    emoti.location = await Location.current();

                    const entryRef: database.Reference = this.globalRef.child(key);
                    const entryData: { emote: string, timestamp: number, uid: string } =
                        (({ emote, timestamp, uid }) => ({ emote, timestamp, uid }))(emoti);

                    try {
                        await entryRef.set(entryData);
                        try {
                            await this.geofire.set(key, emoti.location.toLatLong());
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
            state.emotis = [...state.emotis, emoti];
        },

        "setCenter": (state: IEmotiState, center: Location): void => {
            state.watchArea = { center, radius: state.watchArea.radius };
        },

        "setRadius": (state: IEmotiState, radius: number): void => {
            state.watchArea = { radius, center: state.watchArea.center.clone() };
        },

        "clearEmoti": (state: IEmotiState): void => {
            state.emotis = [];
        }
    };
}
