import { database as fbdb } from 'firebase';
import { db } from '../server/firebase.config';
import Vuex from 'vuex';

interface IEmotiState {

}

class EmotiModule<RootState> implements Vuex.Module<IEmotiState, RootState> {

    namespaced: boolean = true;
    state: IEmotiState;

    constructor() {

    }
}

export {EmotiModule, IEmotiState};
