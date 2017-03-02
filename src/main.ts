import * as Vue from 'vue';
import {sync} from 'vuex-router-sync';
import App from './layout/app.layout.vue';
import "./server/firebase.config";
import router from './router';
import store from './store';

sync(store, router);

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
