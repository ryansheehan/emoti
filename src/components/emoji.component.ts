import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { unicodeToImage } from 'emojione';

@Component
export default class Emoji extends Vue {
    @Prop({required: true})
    code: string;

}
