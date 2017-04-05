import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
//import { IRootState } from '../store';
import {AuthModule} from '../store/auth.store';
import router from '../router';


@Component
export default class App extends Vue {
    
    get isLoaded():boolean { return this.$store.state.isLoaded; }

    created():void {
        this.$store.dispatch(AuthModule.getRedirectStatus)

        .then((status: any)=>{
            console.log(status);
            const authStatus:string = this.$store.state.auth.authenticationStatus;
            if(authStatus !== "unchecked" && authStatus !== "checking") {
                this.$store.dispatch("SetLoaded", true);
                if(status === "authenticated") {
                    router.push({name: "home"});
                } else {
                    router.push({name: "login"});
                }
            }
        })
        .catch(e=>console.error(e));
    }
}
