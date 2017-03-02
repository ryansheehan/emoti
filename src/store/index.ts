import * as Vue from 'vue';
import * as Vuex from 'vuex';
import {StoreOptions, MutationTree} from 'vuex';
import { AuthModule } from './auth.store';
import { CounterModule } from './counter.store';


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        'counter': new CounterModule()
    }
});

// const counter = new CounterModule();
// store.registerModule(['counter'], counter);

const auth = new AuthModule(store);
store.registerModule(['auth'], auth);

export default store;
