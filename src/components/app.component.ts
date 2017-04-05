import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
//import { IRootState } from '../store';
import {AuthModule} from '../store/auth.store';
import router from '../router';


@Component
export default class App extends Vue {
    isLoaded: boolean = false;

    created() {
        this.$store.dispatch(AuthModule.getRedirectStatus)

        .then(()=>{
            this.isLoaded = true;
            router.push({name: "home"});
        })
        .catch(e=>console.error(e));
    }
}
