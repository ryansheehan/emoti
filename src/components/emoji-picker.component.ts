import Vue from "vue";
import { Component, Prop, Watch } from "./vue-class-helpers";
// import { debounce } from "debounce";
import { searchShortnames } from "../emojione.search";
import * as emojione from "emojione";
import "../../node_modules/emojione/extras/css/emojione.min.css"

interface IDebouncedFunction extends Function {
    clear():void;
}

@Component
export default class EmojiPicker extends Vue {
    @Prop()
    selected:string;

    // show:boolean = false;

    // toggleShow() {
    //     this.show = !this.show;
    // }

    searchTerm:string = "";

    private bounced:IDebouncedFunction|undefined|null;
    @Watch("searchTerm", {immediate: true})
    onSearchTermChanged(term:string, oldTerm:string):void {
        // if(this.bounced) this.bounced.clear();
        // if(term) {
        //     this.bounced = debounce(()=>this.searchResults = searchShortnames(term).map(sn=>emojione.shortnameToImage(sn)), 100);
        // } else {
        //     this.searchResults = [];
        // }

        if(term) {
            this.searchResults = searchShortnames(term).map(sn=>emojione.shortnameToImage(sn));
        } else {
            this.searchResults = [];
        }
    }
    searchResults:string[] = [];

    get testTag(): string {
        return emojione.shortnameToImage(":smiley:");
    }
}
