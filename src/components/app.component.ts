import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IRootState } from '../store';


@Component
export default class App extends Vue {
    created() {
        const getState = (state:IRootState):string|null => {
           return state.auth.currentUser ? state.auth.currentUser.uid : null;
        }

        const handler = (value:string|null, oldValue:string|null): void => {
            console.log("login changed!");
            this.$store.dispatch("emoti/watchUid", value);
        }

        console.log("setting watch!");
        this.$store.watch(getState, handler);
    }
}
