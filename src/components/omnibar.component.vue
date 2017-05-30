<script src="./omnibar.component.ts" lang="ts"></script>

<template>
  <md-toolbar class="em-toolbar md-dense">
    <md-button v-show="false" class="md-icon-button">
        <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title">Emotivent</h2>
    <user-avatar v-if="isAuthenticated" imageUrl="https://www.gravatar.com/avatar/559b2e9fe5620de0994a0de5180cd6eb"></user-avatar>    
  </md-toolbar>
</template>

<style scoped>
    .em-toolbar {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
    }
    .em-toolbar h2 {
        flex: 1;
    }
</style>
