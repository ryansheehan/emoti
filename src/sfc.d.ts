declare module "*.vue" {
  import Vue = require('vue')
  export default typeof Vue
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "debounce" {
    export function debounce<A extends Function>(f: A, interval?: number, immediate?: boolean): A & { clear(): void; };
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

    export class MdCore {

    }

    export class MdAvatar {

    }

    export class MdBackdrop {

    }

    export class MdBottomBar {

    }

    export class MdButton {

    }

    export class MdButtonToggle {

    }

    export class MdCard {

    }

    export class MdCheckbox {

    }

    export class MdChips {

    }

    export class MdDialog {

    }

    export class MdDivider {

    }

    export class MdFile {

    }

    export class MdIcon {

    }

    export class MdImage {

    }

    export class MdInputContainer {

    }

    export class MdLayout {

    }

    export class MdList {

    }

    export class MdMenu {

    }

    export class MdProgress {

    }

    export class MdRadio {

    }

    export class MdSelect {

    }

    export class MdSidenav {

    }

    export class MdSnackbar {

    }

    export class MdSpeedDial {

    }

    export class MdSpinner {

    }

    export class MdSubheader {

    }

    export class MdSwitch {

    }

    export class MdTable {

    }

    export class MdTabs {

    }

    export class MdToolbar {

    }

    export class MdTooltip {

    }

    export class MdWhiteframe {

    }


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

declare module "vuefire" {
  import _Vue from 'vue';
  import {
    database
  } from 'firebase';

  type FirebaseSnapshot = database.DataSnapshot;
  type FirebaseReference = database.Reference;
  type FirebaseQuery = database.Query;

  // Returns the key of a Firebase snapshot across SDK versions.
  export function _getKey (snapshot:FirebaseSnapshot): string|null;

  // Returns the original reference of a Firebase reference or query across SDK versions.
  export function _getRef (refOrQuery:FirebaseReference|FirebaseQuery): FirebaseReference;

  // Check if a value is an object.
  export function isObject(val: any): boolean;

  // Convert firebase snapshot into a bindable data record.
  export function createRecord(snapshot: FirebaseSnapshot): Object;

  // Find the index for an object with given key.
  export function indexForKey(array: Array<any>, key: string): number;

  // Bind a firebase data source to a key on a vm.
  export function bind(vm: _Vue, key: string, source: Object): void;

  // Define a reactive property in a given vm if it's not defined yet
  export function defineReactive(vm: _Vue, key: string, val: any): void;

  // Bind a firebase data source to a key on a vm as an Array.
  export function bindAsArray(vm: _Vue, key: string, source: Object, cancelCallback:Function|null|undefined): void;

  // Bind a firebase data source to a key on a vm as an Object.
  export function bindAsObject(vm: _Vue, key: string, source: Object, cancelCallback:Function|null|undefined): void;

  // Unbind a firebase-bound key from a vm.
  export function unbind(vm: _Vue, key:string): void;

  // Ensure the related bookkeeping variables on an instance.
  export function ensureRefs(vm: _Vue): void;

  // Install function passed to Vue.use() in manual installation.
  export function install(Vue: typeof _Vue): void;
}

