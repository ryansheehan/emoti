import Vue from "vue";
import { Component } from "vue-property-decorator";
import {AuthModule} from "../store/auth.store";
import router from "../router";


@Component
export default class App extends Vue {
    get isLoaded():boolean { return this.$store.getters.isInitialized; }
    created():void {
        this.$store.dispatch(AuthModule.initialize)
        .then(()=> {
            console.log("app going home");
            router.push({name: "home"});
        })
        .catch(e=>console.error(e));
    }
}
