import Vue from "vue";
import { Component, Prop, Model, Provide } from "./vue-class-helpers";
import emojiTable from "../emoji-table";


@Component
export default class EmojiPicker extends Vue {
    @Prop()
    value: string;

    @Prop({
        type: Object,
        default: function() {
            return (({ grinning, slight_smile, frowning2, angry }) => ({ grinning, slight_smile, frowning2, angry }))(emojiTable);
        }
    })
    options: {[shortname:string]: string}

    update(emoji:string) {
        this.$emit('input', emoji);
    }
}
