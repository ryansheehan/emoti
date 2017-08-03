<script src="./app.component.ts" lang="ts"></script>

<template>
  <div id="app">
    <omnibar></omnibar>
    <router-view></router-view>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
}
</style>

<style>
.leaflet-z-fix {
    z-index: 400;
}

.md-menu-content {
    z-index: 450;
}
</style>
