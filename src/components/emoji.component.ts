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
    return r;
  }

}
