import * as Vue from 'vue';
import * as Vuex from 'vuex';
import {StoreOptions, MutationTree} from 'vuex';
import { AuthModule } from './auth.store';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  },
  actions: {
    increment({commit}) {
      commit('increment');
    },
    decrement({commit}) {
      commit('decrement');
    }
  }
});

console.log(store);

const auth = new AuthModule(store, 'auth');
store.registerModule('auth', auth);

export default store;
