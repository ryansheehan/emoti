import Vue from "vue";
import Vuex from "vuex";;
import { AuthModule, IAuthState } from "./auth.store";
import { EmotiModule, IEmotiState } from "./emoti.store";


Vue.use(Vuex);

interface IRootState {
    auth?: IAuthState;
    emoti?: IEmotiState
}

const store:Vuex.Store<IRootState> = new Vuex.Store<IRootState>({
    strict: true,

    modules: {
        // counter: new CounterModule<IRootState>(),
        auth: new AuthModule<IRootState>(),
        emoti: new EmotiModule<IRootState>(),
    }
});


export {store as default, IRootState};
