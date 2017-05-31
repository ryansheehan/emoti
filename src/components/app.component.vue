<script src="./app.component.ts" lang="ts"></script>

<template>
  <div id="app">
    <omnibar></omnibar>
    <router-view v-if="!isPending"/>
    <md-spinner class="app-loading-spinner" v-else :md-size="150" md-indeterminate/>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex: auto;
  flex-flow: column nowrap;
}

.app-loading-spinner {
  align-self: center;
}
</style>
