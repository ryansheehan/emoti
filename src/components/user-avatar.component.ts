import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IUser } from '../store/auth.store';

@Component
export default class UserAvatar extends Vue {
  @Prop({required: true})
  user: IUser;

  get photoUrl() { return this.user ? this.user.photoURL : "//"; }
  get displayName() { return this.user ? this.user.displayName : ""; }

  @Prop({required: true})
  logout: ()=>Promise<any>;
}
