import Vue from "vue";
import Vuex from "vuex";;
import { AuthModule, IAuthState } from "./auth.store";
import { CounterModule } from "./counter.store";


Vue.use(Vuex);

const auth: string = "auth";

interface IRootState {
    auth: IAuthState;
}

const store = new Vuex.Store<IRootState>({
    modules: {
        counter: new CounterModule<IRootState>()
    }
});

const authModule: AuthModule<IRootState> = new AuthModule(store);
store.registerModule([auth], authModule);

export default store;
