import Vue from "vue";
import { Component } from "./vue-class-helpers";
import Omnibar from "./omnibar.component.vue";

@Component({
    components: {
        Omnibar
    },
})
export default class App extends Vue {
    async created():Promise<any> {
        await this.$store.dispatch("auth/initAuthStatus");
    }
}
