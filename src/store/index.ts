import Vue from "vue";
import Vuex from "vuex";;
import { AuthModule, IAuthState, defaultAuthState } from "./auth.store";
import { EmotiModule, IEmotiState, defaultEmotiState } from "./emoti.store";
import { CounterModule } from "./counter.store";
import { db } from "../server/firebase.config";


Vue.use(Vuex);

interface IRootState {
    auth: IAuthState;
    emoti: IEmotiState;
}

const store:Vuex.Store<IRootState> = new Vuex.Store<IRootState>({
    strict: true,

    state: {
        auth: defaultAuthState,
        emoti: defaultEmotiState,
    },

    modules: {
        counter: new CounterModule<IRootState>(),
        auth: new AuthModule(),
        emoti: new EmotiModule(db)
    }
});


// const authModule: AuthModule<IRootState> = new AuthModule(store, ["auth"]);
// store.registerModule([auth], authModule);

export {store as default, IRootState};
