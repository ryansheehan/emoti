export * from "vue-property-decorator";
export { mapActions, mapGetters, mapState } from "vuex"

import { createDecorator } from "vue-class-component";
import Vue, {ComponentOptions} from "vue"

// import { mapGetters } from "vuex";

// export function VuexGetter(getterMethod: string) {
//     return createDecorator((options:ComponentOptions<Vue>, key:string)=>{
//         if(!options.computed) options.computed = {};
//         options.computed[key] = function(){
//             return this.$store.getters[getterMethod]
//         }
//     })
// }
