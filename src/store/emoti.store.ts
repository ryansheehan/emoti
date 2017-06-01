import Vuex from "vuex";
import firebaseApp from "../firebase.config";

const database = firebaseApp.database();

export interface IEmoti {

}

export interface IEmotiState {
    emotis: IEmoti[];
}

export class EmotiModule<RootState> implements Vuex.Module<IEmotiState, RootState> {
    namespaced:boolean = true;

    state: IEmotiState = {
        emotis: [],
    }
}
