import Vue from "vue";
import { Component, mapActions, mapGetters, mapState, NoCache } from "./vue-class-helpers";
import { IEmoti } from "../store/emoti.store";
import { IAuthState } from "../store/auth.store";
import EmojiPicker from "./emoji-picker.component.vue";
// import { Map, TileLayer } from "vue2-leaflet";
import OlMap from "./ol-map.component.vue";
import emojiTable from "../emoji-table";
import { getCurrentLocation } from "../location";
import { Location } from "../location";


// import * as emojione from "emojione";

// console.log(`smiley => ${emojione.shortnameToUnicode(":smiley:")}`);
// console.log(`${"😃".charCodeAt(0).toString(16)} + ${"😃".charCodeAt(1).toString(16)}`); //d83d + de03
// console.log("\ud83d\ude03"); // 😃

@Component({
    components: {
        EmojiPicker,
        OlMap,
        // "v-map": Map,
        // "v-tilelayer": TileLayer
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

    currentLocation: Location = new Location({lat:33.2044240, long:-96.9498580});
    currentZoom: number = 16;

    // used in the template
    // tslint:disable-next-line:no-unused-variable
    private emojiOptions: { [shortname: string]: string } =  // emojiTable;
        (({ grinning, slight_smile, neutral_face, frowning2, angry }) =>
        ({ grinning, slight_smile, neutral_face, frowning2, angry }))(emojiTable);

    created():void {
        (async ():Promise<any> => this.currentLocation = await getCurrentLocation())();
    }
}
