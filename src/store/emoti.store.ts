import Vuex from "vuex";
import { database } from "firebase";
import firebaseApp from "../firebase.config";

const db: database.Database = firebaseApp.database();

export interface IEmoti {
    emote: string;
    timestamp: number;
}

export interface IEmotiState {
    emotis: IEmoti[];
}

export class EmotiModule<RootState> implements Vuex.Module<IEmotiState, RootState> {
    namespaced:boolean = true;

    private globalRef:database.Reference = db.ref("global");

    state: IEmotiState = {
        emotis: [],
    }

    actions: Vuex.ActionTree<IEmotiState, RootState> = {
        "post": ({commit}, emoti:IEmoti): Promise<any> => {
            console.log(`posting ${emoti}`);
            return new Promise((resolve, reject)=> {
                this.globalRef.push(emoti, (e: Error)=> {
                    if(e) {
                        console.error(e);
                        reject(e);
                    } else {
                        commit("addEmoti", emoti);
                        resolve();
                    }
                });
            });
        }
    }

    mutations: Vuex.MutationTree<IEmotiState> = {
        "addEmoti": (state:IEmotiState, emoti:IEmoti): any => {
            state.emotis = [...state.emotis, emoti];
        }
    }
}
