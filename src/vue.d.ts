import * as Vue from 'vue';

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
//    firebase?: IFirebaseRef;
  }
}

declare module "vue/types/vue" {
  interface Vue {
//    $firebaseRefs:IFirebaseRef;
  }
}
