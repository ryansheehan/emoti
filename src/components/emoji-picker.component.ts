import Vue from "vue";
import { Component, Prop } from "./vue-class-helpers";
import { shortNameEmoji, getEmojiSvgPath, Emoji } from "../emoji-table";


@Component({
    methods: {
        getEmojiSvgPath
    }
})
export default class EmojiPicker extends Vue {
    @Prop()
    value: Emoji;

    @Prop({
        type: Object,
        default: function():{[shortname:string]:Emoji} {
            return (({ grinning, slight_smile, frowning2, angry }) => ({ grinning, slight_smile, frowning2, angry }))(shortNameEmoji);
        }
    })
    options: {[shortname:string]: Emoji}

    update(emoji:Emoji):void {
        this.$emit("input", emoji);
    }
}
