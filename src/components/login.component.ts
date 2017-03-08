import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {Provider, IUser, AuthModule} from '../store/auth.store';

@Component
export default class Login extends Vue {
    login(provider: Provider | string):Promise<any> {
        console.log("signing in with google");
        return this.$store.dispatch('login', provider);
    }

    loginGoogle() {
        this.login(AuthModule.provider.google);
    }
}
