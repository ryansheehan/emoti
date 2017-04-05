import Vue from "vue";
import Vuex from "vuex";;
//import { AuthModule, IAuthState } from "./auth.store";
import { AuthModule, IAuthState } from "./auth.store";
import { EmotiModule, IEmotiState } from "./emoti.store";
import { CounterModule } from "./counter.store";
import { db } from '../server/firebase.config';


Vue.use(Vuex);

const auth: string = "auth";

interface IRootState {
    auth: IAuthState;
    emoti: IEmotiState;
}

const store = new Vuex.Store<IRootState>({
    modules: {
        counter: new CounterModule<IRootState>(),
        auth: new AuthModule(),
        emoti: new EmotiModule(db)
    }
});

// const authModule: AuthModule<IRootState> = new AuthModule(store, ["auth"]);
// store.registerModule([auth], authModule);

export {store as default, IRootState};
