import Vue from "vue";
import Vuex from "vuex";;
import { AuthModule, IAuthState } from "./auth.store";


Vue.use(Vuex);

interface IRootState {
    auth: IAuthState;

}

const store:Vuex.Store<IRootState> = new Vuex.Store<IRootState>({
    strict: true,

    state: {
        auth: {
            authState: "unauthenticated",
            user: null,
            initialized: false
        },
    },

    modules: {
        // counter: new CounterModule<IRootState>(),
        auth: new AuthModule<IRootState>(),
    }
});


export {store as default, IRootState};
