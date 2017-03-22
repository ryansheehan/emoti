import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import UserAvatar from './user-avatar.component.vue';
import EventEntry from './event-entry.component.vue';
import EventView from './event-view.component.vue';
import {Provider, IUser} from '../store/auth.store';
import {IEmotivent} from '../store/emoti.store';

@Component({
  components: {
    UserAvatar,
    EventEntry,
    EventView,
  }
})
export default class Home extends Vue {
  get currentUser():IUser {
    return this.$store.state.auth.currentUser;
  }
  login(provider: Provider):Promise<any> {
    return this.$store.dispatch('auth/login', provider);
  }
  logout():Promise<any> {
    return this.$store.dispatch('auth/logout');
  }

  get emotivents(): IEmotivent[] {
    return this.$store.getters['emoti/userEvents'];
  }
}
