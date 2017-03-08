import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IUser, AuthModule } from '../store/auth.store';

@Component
export default class UserAvatar extends Vue {
  @Prop({required: true})
  user: IUser;

  get photoUrl() { return this.user ? this.user.photoURL : "//"; }
  get displayName() { return this.user ? this.user.displayName : ""; }

  @Prop({required: true})
  login: (provider:string)=>Promise<any>;

  @Prop({required: true})
  logout: ()=>Promise<any>;

  loginGoogle() {
    //console.log("Login w/ google");
    this.login(AuthModule.provider.google);
  }

  test() { console.log("logout"); }
}
