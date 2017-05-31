import Vue from 'vue';
import { Component, Prop } from './vue-class-helpers';

@Component
export default class UserAvatar extends Vue {
  @Prop({required: true})
  imageUrl: string;

}
