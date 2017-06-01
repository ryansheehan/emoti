import Vue from "vue";
import { Component } from "./vue-class-helpers";
import LoginAvatar from "./login-avatar.component.vue";
import { mapActions, mapGetters } from "vuex";

@Component({
    components: {
        LoginAvatar
    },

    computed: {
        ...mapGetters("auth", ["isAuthenticated", "isPending"])
    },

    methods: {
        ...mapActions("auth", ["logout"])
    }
})
export default class Omnibar extends Vue {
    test() { console.log("hello world!"); }
}
