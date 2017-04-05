import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import UserAvatar from './user-avatar.component.vue';
import EventEntry from './event-entry.component.vue';
import EventView from './event-view.component.vue';
import { IEmotivent } from '../store/emoti.store';
import {IUser} from '../store/auth.store'
import router from '../router';

@Component({
    components: {
        UserAvatar,
        EventEntry,
        EventView,
    }
})
export default class Home extends Vue {
    get currentUser(): IUser {
        return this.$store.state.auth.currentUser;
    }

    logout(): Promise<any> {
        return this.$store.dispatch('logout')
            .then(() => {
                this.$router.push({ name: "login" });
            })
            .catch(e => console.error(e));
    }

    get emotivents(): IEmotivent[] {
        return this.$store.getters['emoti/userEvents'];
    }
}
