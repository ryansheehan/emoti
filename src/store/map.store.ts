import Vuex from "vuex";
import { Location } from "../location";

export interface IMapState {
    center: Location;
}

export class MapModule<RootState> implements Vuex.Module<IMapState, RootState> {
    state: IMapState = {
        center: new Location({lat:0,long:0})
    }

    actions: Vuex.ActionTree<IMapState, RootState> = {
        "setCenter": ({commit}, location:Location): void => {
            commit("setCenter", location);
        }
    };

    mutations: Vuex.MutationTree<IMapState> = {
        "setCenter": (state:IMapState, location:Location): void => {
            state.center = location;
        }
    }
}
