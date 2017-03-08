import Vue from 'vue';
import {sync} from 'vuex-router-sync';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

import App from './components/app.component.vue';
import "./server/firebase.config";
import router from './router';
import store from './store';

sync(store, router);

Vue.use(VueMaterial);

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
