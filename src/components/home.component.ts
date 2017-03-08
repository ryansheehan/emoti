import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import UserAvatar from './user-avatar.component.vue';
import {Provider, IUser} from '../store/auth.store';

@Component({
  components: {
    UserAvatar,
  }
})
export default class Home extends Vue {
  get currentUser():IUser {
    return this.$store.state.auth.currentUser;
  }
  login(provider: Provider):Promise<any> {
    return this.$store.dispatch('login', provider);
  }
  logout():Promise<any> {
    return this.$store.dispatch('logout');
  }
}
