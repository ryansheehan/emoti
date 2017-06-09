declare module "*.vue" {
  import Vue = require('vue')
  export default typeof Vue
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "geofire" {
    import { database } from "firebase";

    export type Location = number[]; // ["lat", "long"]

    export type GeoQueryEvent = "ready" | "key_entered" | "key_exited" | "key_moved";

    type voidFunc = ()=>void;
    type argFunc = (key:string, location:Location, distance:number)=>void

    export type GeoQueryCallback = Function | argFunc;

    export interface IGeoQueryCriteria {
        center: Location;
        radius: number;
    }

    export interface IGeoCallbackRegistration {
        cancel():void;
    }

    export interface IGeoQuery {
        center():Location;
        radius():number;
        updateCriteria(criteria:IGeoQueryCriteria):void;
        on(eventType:GeoQueryEvent, callback:GeoQueryCallback):IGeoCallbackRegistration;
        cancel():void;
    }

    export default class GeoFire {
        constructor (dbRef:database.Reference);
        ref():database.Reference;
        get(key:string):Promise<Location|null>;
        set(keyOrLocations:string|{[key:string]:Location|null}, location?:Location):Promise<any>;
        remove(key:string):Promise<any>;
        query(criteria:IGeoQueryCriteria):IGeoQuery;

        static distance(loc1:Location, loc2:Location):number;
    }
}

declare module "emojione" {
  export let emojiVersion:string;
  export let emojiSize:string;
  export let greedyMatch:boolean;
  export let imagePathPNG:string;
  export let imageTitleTag:boolean;
  export let sprites:boolean;
  export let ascii:boolean;
  export let riskyMatchAscii:boolean;

  export function toShort(unicode:string):string;
  export function shortnameToAscii(shortname:string):string;
  export function shortnameToUnicode(shortname:string):string;
  export function toImage(str:string): string;
  export function shortnameToImage(shortname:string):string;
  export function unicodeToImage(code:string):string;
}

declare module "vue-material" {
    import Vue from 'vue';

    export class MdCore {}
    export class MdAvatar {}
    export class MdBackdrop {}
    export class MdBottomBar {}
    export class MdButton {}
    export class MdButtonToggle {}
    export class MdCard {}
    export class MdCheckbox {}
    export class MdChips {}
    export class MdDialog {}
    export class MdDivider {}
    export class MdFile {}
    export class MdIcon {}
    export class MdImage {}
    export class MdInputContainer {}
    export class MdLayout {}
    export class MdList {}
    export class MdMenu {}
    export class MdProgress {}
    export class MdRadio {}
    export class MdSelect {}
    export class MdSidenav {}
    export class MdSnackbar {}
    export class MdSpeedDial {}
    export class MdSpinner {}
    export class MdSubheader {}
    export class MdSwitch {}
    export class MdTable {}
    export class MdTabs {}
    export class MdToolbar {}
    export class MdTooltip {}
    export class MdWhiteframe {}

    export interface IVueMaterial {
        install(Vue: Vue):void,
        MdCore: MdCore,
        MdAvatar: MdAvatar,
        MdBackdrop: MdBackdrop,
        MdBottomBar: MdBottomBar,
        MdButton: MdButton,
        MdButtonToggle: MdButtonToggle,
        MdCard: MdCard,
        MdCheckbox: MdCheckbox,
        MdChips: MdChips,
        MdDialog: MdDialog,
        MdDivider: MdDivider,
        MdFile: MdFile,
        MdIcon: MdIcon,
        MdImage: MdImage,
        MdInputContainer: MdInputContainer,
        MdLayout: MdLayout,
        MdList: MdList,
        MdMenu: MdMenu,
        MdProgress: MdProgress,
        MdRadio: MdRadio,
        MdSelect: MdSelect,
        MdSidenav: MdSidenav,
        MdSnackbar: MdSnackbar,
        MdSpeedDial: MdSpeedDial,
        MdSpinner: MdSpinner,
        MdSubheader: MdSubheader,
        MdSwitch: MdSwitch,
        MdTable: MdTable,
        MdTabs: MdTabs,
        MdToolbar: MdToolbar,
        MdTooltip: MdTooltip,
        MdWhiteframe: MdWhiteframe
    }

    const options: Vue.PluginObject<IVueMaterial>;

    export default options;
}
