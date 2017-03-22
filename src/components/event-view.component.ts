import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEmotivent } from '../store/emoti.store';

@Component
export default class EventView extends Vue {
    @Prop({required: true})
    emotivent: IEmotivent;
}
