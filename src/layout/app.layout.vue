<template>
  <div id="app">
    <Login :user="currentUser" :login="login" :logout="logout"></Login>    
    <img src="../assets/logo.png">
    <div>
      <router-link :to="{ name: 'hello' }">Hello</router-link>
      <router-link :to="{ name: 'counter' }">Counter</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import * as Vue from 'vue';
import Component from 'vue-class-component';
import Login from '../components/login.component.vue';
import {Provider, IUser} from '../store/auth.store';

@Component({
  components: {
    Login,
  }
})
export default class App extends Vue {
  get currentUser():IUser {    
    return this.$store.state.auth.currentUser;
  }
  login(provider: Provider):Promise<any> {
    return this.$store.dispatch('login', provider);
  }
  logout():Promise<any> {
    return this.$store.dispatch('logout');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
