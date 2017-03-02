import * as Vue from 'vue';
import * as Vuex from 'vuex';
import {StoreOptions, MutationTree} from 'vuex';
import { AuthModule } from './auth.store';
import { CounterModule } from './counter.store';


Vue.use(Vuex);

interface IRootState {
}

const store = new Vuex.Store<IRootState>({
    modules: {
        counter: new CounterModule<IRootState>()
    }
});

const auth = new AuthModule(store);
store.registerModule(['auth'], auth);

export default store;
