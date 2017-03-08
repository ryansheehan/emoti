import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as emojione from "emojione";


@Component
export default class Emoji extends Vue {

  @Prop({required: true})
  shortname: string;

  get code():string {
    console.log(this.shortname);
    const r = emojione.shortnameToUnicode(this.shortname);
    console.log(r);
    console.log(r.length);
    console.log(r.charCodeAt(0),r.charCodeAt(1));
    console.log(r.charCodeAt(0).toString(16),r.charCodeAt(1).toString(16));
    console.log("\ud83d\ude04");
    return r;
  }

}
