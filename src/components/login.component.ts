import * as Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IUser, AuthModule } from '../store/auth.store';

@Component
export default class Login extends Vue {
  @Prop({required: true})
  user: IUser;  

  @Prop({required: true})
  login: (provider:string)=>Promise<any>;

  @Prop({required: true})
  logout: ()=>Promise<any>;

  loginGoogle() {
    //console.log("Login w/ google");
    this.login(AuthModule.provider.google);
  }
}
