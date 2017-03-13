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
    start: number;
    count : number;
    events: IEmotivent[];
}


class EmotiState {
    committedEventIds: string[] = [];
    events: { [uid:string]:IEventRange} = {};
}

interface IEmotiState extends EmotiState {

}

class EmotiModule<RootState> implements Vuex.Module<IEmotiState, RootState> {

    static readonly create = "create";
    static readonly updateEvents = "updateEvents";
    static readonly watchUid = "watchUid";

    namespaced: boolean = true;

    _emotionsRef: fbdb.Reference;

    actions: Vuex.ActionTree<IEmotiState, RootState> = {
        [EmotiModule.create]: ({commit}, event: IEmotivent): Promise<string|null>  => {
            return new Promise<string | null>((resolve, reject)=> {
                const ref: fbdb.ThenableReference =  this._emotionsRef.push(event)

                .then(()=>{
                    const key: string | null = ref.key;
                    commit(EmotiModule.create);
                    resolve(key);
                })

                .catch(e=> {
                    reject(e);
                });

            });
        },

        [EmotiModule.watchUid]: ({commit}, uid:string): Promise<any> => {
            return new Promise<any>((resolve, reject)=>{

            });
        }
    };

    mutations: Vuex.MutationTree<IEmotiState> = {
        [EmotiModule.create]: (state: IEmotiState, eventId: string): void => {
            state.committedEventIds.push(eventId);
        },

        // [EmotiModule.updateEvents]: (state: IEmotiState, events:IEmotivent[]): void =>{
        //     state.events = events;
        // },
    };

    constructor(private db: fbdb.Database, public state?:IEmotiState) {
        if(!this.state) this.state = new EmotiState();

        this._emotionsRef = db.ref("emotions/");
    }
}

export {EmotiModule, IEmotiState, IEmotivent};
