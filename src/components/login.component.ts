import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    login(provider:string):Promise<any> {
        return this.$store.dispatch("login", provider)
        .then(()=> {
            console.log("changing route to home")
            this.$router.push({name: "home"});
        })
        .catch(e=>console.error(e));
    }
}
