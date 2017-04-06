import { database as fbdb } from 'firebase';
import Vuex from 'vuex';

interface IEmotivent {
    datetime: Date;
    response: string;
    tags: string;
    type: string;
    uid: string;
}

interface IEventRange {
    events: IEmotivent[];
}


class EmotiState {
    userUid: string | null;
    committedEventIds: string[] = [];
    events: { [uid:string]: IEventRange } = {};
}

interface IEmotiState extends EmotiState {

}

const defaultEmotiState = new EmotiState();

class EmotiModule<RootState> implements Vuex.Module<IEmotiState, RootState> {

    static readonly create = "create";
    static readonly addEvent = "addEvent";
    static readonly watchUid = "watchUid";
    static readonly setUserUid = "setUserUid";

    namespaced: boolean = true;

    private _emotionsRef: fbdb.Reference;
    private _listeners: any;

    getters: Vuex.GetterTree<IEmotiState, RootState> = {
        userEvents: (state:IEmotiState): IEmotivent[] => {
            if(state.userUid) {
                return state.events[state.userUid].events;
            }
            return [];
        }
    }

    actions: Vuex.ActionTree<IEmotiState, RootState> = {
        [EmotiModule.setUserUid]: ({commit, dispatch}, uid:string | null): Promise<any> => {
            commit(EmotiModule.setUserUid, uid);
            if(uid) {
                return dispatch(EmotiModule.watchUid, uid);
            }
            return new Promise<any>((resolve, reject)=>{});
        },

        [EmotiModule.create]: ({commit}, event: IEmotivent): Promise<string|null>  => {
            return new Promise<string | null>((resolve, reject)=> {
                const ref: fbdb.ThenableReference =  this._emotionsRef.push(event)

                .then(()=>{
                    const key: string | null = ref.key;
                    commit(EmotiModule.create, key);
                    resolve(key);
                })

                .catch(e=> {
                    reject(e);
                });

            });
        },

        [EmotiModule.watchUid]: ({commit, state}, uid:string | null): Promise<any> => {
            return new Promise<any>((resolve, reject)=>{
                if(uid && (!(uid in state.events))) {
                    this._emotionsRef
                    .orderByChild("uid")
                    .equalTo(uid)
                    .on("child_added", (snapshot:fbdb.DataSnapshot, prevKey: string) => {
                        if(this.state) {
                            const event: IEmotivent = snapshot.val();
                            if(event) {
                                commit(EmotiModule.addEvent, event);
                            }
                        }
                    });
                }
            });
        }
    };

    mutations: Vuex.MutationTree<IEmotiState> = {
        [EmotiModule.setUserUid]: (state: IEmotiState, uid: string | null): void => {
            if(uid) {
                state.userUid = uid;
            } else {
                const uids = Object.keys(state.events);
                uids.forEach(value => {
                    this._emotionsRef
                    .orderByChild("uid")
                    .equalTo(value)
                    .off("child_added");
                });
                state.events= {};
            }
        },

        [EmotiModule.create]: (state: IEmotiState, eventId: string): void => {
            state.committedEventIds.push(eventId);
        },

        [EmotiModule.addEvent]: (state:IEmotiState, event:IEmotivent): void => {
            const {uid} = event;
            if(!(uid in state.events)) {
                state.events[uid] = { events: [] };
            }
            state.events[uid].events.push(event);
        }
    };

    constructor(private db: fbdb.Database, public state?:IEmotiState) {
        if(!this.state) {
            this.state = defaultEmotiState;
        }

        this._emotionsRef = db.ref("emotions/");
    }
}

export {EmotiModule, IEmotiState, IEmotivent, defaultEmotiState};
