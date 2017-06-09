import Vue from "vue";
import { Component, mapActions, mapGetters, mapState, NoCache } from "./vue-class-helpers";
import { IEmoti } from "../store/emoti.store";
import { IAuthState } from "../store/auth.store";
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

    computed: {
        ...mapGetters("auth", ["isAuthenticated", "isPending"]),
        ...mapState("auth", {
            uid: (state:IAuthState)=> state.user ? state.user.uid : ""
        })
    }
})
export default class EmoteEntry extends Vue {
    // tslint:disable-next-line:no-string-literal
    emote: string = emojiTable["slight_smile"];

    @NoCache
    get emoti(): IEmoti {
        return {
            emote: this.emote,
            timestamp: Date.now(),
            uid: this.uid
        };
    }

    uid:string;

    // used in the template
    // tslint:disable-next-line:no-unused-variable
    private emojiOptions: { [shortname: string]: string } =  // emojiTable;
        (({ grinning, slight_smile, neutral_face, frowning2, angry }) =>
        ({ grinning, slight_smile, neutral_face, frowning2, angry }))(emojiTable);
}
