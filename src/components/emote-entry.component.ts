import Vue from "vue";
import { Component, mapActions } from "./vue-class-helpers";
import EmojiPicker from "./emoji-picker.component.vue";
import * as emojione from "emojione";

@Component({
    components: {
        EmojiPicker
    },

    methods: {
        ...mapActions("emoti", ["post"])
    }
})
export default class EmoteEntry extends Vue {
    emote: string = this.shortnameToUnicode(":smiley:");

    shortnameToUnicode(shortname:string): string { return emojione.shortnameToUnicode(shortname); }

    fizz():string {return "buzz";}

    testPost():void {
        console.log(this.emote);
    }
}
