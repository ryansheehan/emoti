import * as Vuex from 'vuex';

interface ICounterState {
  count: number;
}

class CounterState {
  count: number = 0;
}

class CounterModule<RootState> implements Vuex.Module<ICounterState, RootState> {
    static readonly increment: "increment";
    static readonly decrement: "decrement";

    state: ICounterState;
    namespaced: true;

    actions: Vuex.ActionTree<ICounterState, RootState> = {
        [CounterModule.increment]: (context: Vuex.ActionContext<ICounterState, RootState>, amount: number = 1) => {
            context.commit(CounterModule.increment, amount);
        },
        [CounterModule.decrement]: (context: Vuex.ActionContext<ICounterState, RootState>, amount: number = 1) => {
            context.commit(CounterModule.decrement, amount);
        }
    }

    mutations: Vuex.MutationTree<ICounterState> = {
        [CounterModule.increment]: (state: ICounterState, amount: number) => state.count += amount,
        [CounterModule.decrement]: (state: ICounterState, amount: number) => state.count -= amount,
    }

    constructor(initialState: ICounterState = {count: 0}) {
        this.state = initialState;
    }
}

export {ICounterState, CounterModule};
