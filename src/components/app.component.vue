<script src="./app.component.ts" lang="ts"></script>

<template>
  <div id="app">
    <omnibar></omnibar>
    <router-view/>    
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex: auto;
  flex-flow: column nowrap;
}
</style>
