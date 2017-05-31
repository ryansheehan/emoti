import Vue from "vue";
import { Component } from "./vue-class-helpers";
import UserAvatar from "./user-avatar.component.vue";
import { mapActions, mapGetters } from "vuex";

@Component({
    components: {
        UserAvatar
    },

    computed: {
        ...mapGetters("auth", ["isAuthenticated"])
    },

    methods: {
        ...mapActions("auth", ["logout"])
    }
})
export default class Omnibar extends Vue {
    test() { console.log("hello world!"); }
}
