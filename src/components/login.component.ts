import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
//import {Provider, IUser, AuthModule} from '../store/auth.store';

@Component
export default class Login extends Vue {
    // login(provider: Provider | string):Promise<any> {
    //     console.log("signing in with google");
    //     return this.$store.dispatch('auth/login', provider);
    // }

    // loginGoogle() {
    //     this.login(AuthModule.provider.google);
    // }

    login(provider:string):Promise<any> {
        return this.$store.dispatch('login', provider)
        .then(()=>{
            this.$router.push({name: 'home'});
        })
        .catch(e=>console.error(e));
    }
}
