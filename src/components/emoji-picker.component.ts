import Vue from "vue";
import { Component } from "./vue-class-helpers";
import * as emojione from "emojione";

@Component
export default class EmojiPicker extends Vue {
    selected:string;
}
