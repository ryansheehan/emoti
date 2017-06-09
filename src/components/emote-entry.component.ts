import Vue from "vue";
import { Component, mapActions, Prop } from "./vue-class-helpers";
import EmojiPicker from "./emoji-picker.component.vue";
import emojiTable from "../emoji-table";
// import * as emojione from "emojione";

// console.log(`smiley => ${emojione.shortnameToUnicode(":smiley:")}`);
// console.log(`${"😃".charCodeAt(0).toString(16)} + ${"😃".charCodeAt(1).toString(16)}`); //d83d + de03
// console.log("\ud83d\ude03"); // 😃

@Component({
    components: {
        EmojiPicker
    },

    methods: {
        ...mapActions("emoti", ["post"])
    },
})
export default class EmoteEntry extends Vue {
    emote: string = emojiTable["slight_smile"];

    private emojiOptions: { [shortname: string]: string } =  //emojiTable;
        (({ grinning, slight_smile, neutral_face, frowning2, angry }) =>
        ({ grinning, slight_smile, neutral_face, frowning2, angry }))(emojiTable);

    testPost(): void {
        console.log(`POST: ${this.emote}`);
    }
}
