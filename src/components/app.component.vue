<script src="./app.component.ts" lang="ts"></script>

<template>
  <div id="app">
    <!--<div>
      <router-link :to="{ name: 'hello' }">Hello</router-link>
      <router-link :to="{ name: 'counter' }">Counter</router-link>
    </div>-->
    <router-view></router-view>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
