import Vue from "vue";
import Vuex from "vuex";;
import { AuthModule, IAuthState } from "./auth.store";
import { EmotiModule, IEmotiState } from "./emoti.store";
import { MapModule, IMapState } from "./map.store";

Vue.use(Vuex);

interface IRootState {
    auth?: IAuthState;
    emoti?: IEmotiState;

    //map?: IMapState;
}

const store:Vuex.Store<IRootState> = new Vuex.Store<IRootState>({
    strict: true,

    modules: {
        // counter: new CounterModule<IRootState>(),
        auth: new AuthModule<IRootState>(),
        emoti: new EmotiModule<IRootState>(),
        // map: new MapModule<IRootState>()
    }
});


export {store as default, IRootState};
