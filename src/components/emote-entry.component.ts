import Vue from "vue";
import { Component, mapActions } from "./vue-class-helpers";
import * as emojione from "emojione";

@Component({
    components: {

    },

    methods: {
        ...mapActions("emoti", ["post"])
    }
})
export default class EmoteEntry extends Vue {
    emote: string = this.shortnameToUnicode(":smiley:");

    shortnameToUnicode(shortname:string): string { return emojione.shortnameToUnicode(shortname); }

    testPost():void {
        console.log(this.emote);
    }
}
