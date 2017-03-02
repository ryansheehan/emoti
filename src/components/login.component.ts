import * as Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  @Prop({required: true})
  loginState: any;

  @Prop({required: true})
  login: (provider:string)=>Promise<any>;

  @Prop({required: true})
  logout: ()=>Promise<any>;
}