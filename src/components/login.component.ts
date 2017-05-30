import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    async login(provider: string): Promise<any> {
        await this.$store.dispatch("auth/login", provider);
    }
}
