import Vue from "vue";
import { Component, mapActions, mapGetters, mapState, NoCache } from "./vue-class-helpers";
import { IEmotiData } from "../store/emoti.store";
import { IAuthState } from "../store/auth.store";
import EmojiPicker from "./emoji-picker.component.vue";
// import { Map, TileLayer } from "vue2-leaflet";
// import OlMap from "./ol-map.component.vue";
import EmoteMap from "./emote-map.component.vue";
import { Emoji, shortNameEmoji, getEmojiSvgPath } from "../emoji-table";
import Location from "../location";
import { Map, TileLayer } from "vue2-leaflet";


// import * as emojione from "emojione";

// console.log(`smiley => ${emojione.shortnameToUnicode(":smiley:")}`);
// console.log(`${"😃".charCodeAt(0).toString(16)} + ${"😃".charCodeAt(1).toString(16)}`); //d83d + de03
// console.log("\ud83d\ude03"); // 😃

@Component({
    components: {
        EmojiPicker,
        // OlMap,
        EmoteMap,
        // "v-map": Map,
        // "v-tilelayer": TileLayer
    },

    methods: {
        ...mapActions("emoti", ["post"]),
        getEmojiSvgPath
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
    emote: Emoji = shortNameEmoji["slight_smile"];

    @NoCache
    get emoti(): Promise<IEmotiData> {

        return new Promise<IEmotiData>(async (resolve) => {

            let location: Location = new Location({lat:0, lng: 0});
            try {
                location = await Location.current();
            } catch (e) {
                // just let the default pass through
            }

            resolve({
                emote: this.emote,
                timestamp: Date.now(),
                location,
                uid: this.uid,
            });
        });
    }

    uid:string;

    currentLocation: Location | null = null;

    currentZoom: number = 13;

    // used in the template
    // tslint:disable-next-line:no-unused-variable
    emojiOptions: { [shortname: string]: Emoji } =  // emojiTable;
        (({ grinning, slight_smile, neutral_face, frowning2, angry }) =>
        ({ grinning, slight_smile, neutral_face, frowning2, angry }))(shortNameEmoji);

    created():void {
        Location.current()
        .then(l=>this.currentLocation = l)
        .catch(e=>{
            console.warn(e);
            console.warn("Falling back to default location");
            this.currentLocation = new Location({lat:33.078715, lng:-96.808306});
        })
    }
}
