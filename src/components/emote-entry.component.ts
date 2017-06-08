import Vue from "vue";
import { Component, mapActions } from "./vue-class-helpers";
import emojiTable from "../emoji-table";
// import * as emojione from "emojione";

// console.log(`smiley => ${emojione.shortnameToUnicode(":smiley:")}`);
// console.log(`${"😃".charCodeAt(0).toString(16)} + ${"😃".charCodeAt(1).toString(16)}`); //d83d + de03
// console.log("\ud83d\ude03"); // 😃

@Component({
    components: {

    },

    methods: {
        ...mapActions("emoti", ["post"])
    }
})
export default class EmoteEntry extends Vue {
    emote: string = emojiTable["smiley"];

    private emojiOptions:{[shortname:string]: string} = // emojiTable;
        (({grin, smiley, frowning2, angry})=>
        ({grin, smiley, frowning2, angry}))(emojiTable);

    testPost():void {
        console.log(this.emote);
    }

    test(emoji:string): void {
        console.log(emoji);
    }
}
