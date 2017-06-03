import Vue from "vue";
import { Component, Prop, Watch, Inject } from "./vue-class-helpers";
// import { debounce } from "debounce";
import { searchShortnames, searchCategories } from "../emojione.search";
import * as emojione from "emojione";
import "../../node_modules/emojione/extras/css/emojione.min.css"

interface IDebouncedFunction extends Function {
    clear():void;
}

const iconsByCategory:{[category:string]:string[]} =
    Object.keys(searchCategories)
    .reduce<any>((result:{[category:string]:string[]}, category:string)=>{
        const shortnames:string[] = searchCategories[category];
        result[category] = shortnames.map((shortname:string)=>emojione.shortnameToImage(shortname));
        return result;
    }, {});

@Component
export default class EmojiPicker extends Vue {
    @Prop()
    selected:string;

    // show:boolean = false;

    // toggleShow() {
    //     this.show = !this.show;
    // }

    get people():string[] { return iconsByCategory["people"]; }
    get symbols():string[] { return iconsByCategory["symbols"]; }
    get objects():string[] { return iconsByCategory["objects"]; }
    get nature():string[] { return iconsByCategory["nature"]; }
    get food():string[] { return iconsByCategory["food"]; }
    get travel():string[] { return iconsByCategory["travel"]; }
    get activity():string[] { return iconsByCategory["activity"]; }
    get flags():string[] { return iconsByCategory["flags"]; }
    get regional():string[] { return iconsByCategory["regional"]; }
    get modifier():string[] { return iconsByCategory["modifier"]; }

    searchCategories:{[category:string]:string[]} = iconsByCategory;

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
