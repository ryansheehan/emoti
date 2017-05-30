import Vue from "vue";
import { Component } from "vue-property-decorator";
import Omnibar from "./omnibar.component.vue";
import { mapGetters } from "vuex";

@Component({
    components: {
        Omnibar
    },
    computed: {
        ...mapGetters("auth", ["isPending"])
    }
})
export default class App extends Vue {
    // get isInitialized():boolean {
    //     return !this.$store.getters["auth/isPending"];
    // }
    async created():Promise<any> {
        await this.$store.dispatch("auth/initAuthStatus");
    }
}
