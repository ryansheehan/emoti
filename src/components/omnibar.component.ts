import Vue from "vue";
import { Component } from "vue-property-decorator";
import UserAvatar from "./user-avatar.component.vue";

@Component({
    components: {
        UserAvatar
    }
})
export default class Omnibar extends Vue {
    get isAuthenticated():boolean {
        return this.$store.getters["auth/isAuthenticated"];
    }

    async logout():Promise<any> {
        await this.$store.dispatch("auth/logout");
    }
}
