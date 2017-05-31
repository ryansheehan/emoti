<script src="./omnibar.component.ts" lang="ts"></script>

<template>
  <md-toolbar class="em-toolbar md-dense">
    <md-button v-show="false" class="md-icon-button">
        <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title">Emotivent</h2>
    <login-avatar></login-avatar>
    <!--<md-menu md-align-trigger v-if="isAuthenticated">        
        <user-avatar md-menu-trigger :imageUrl="avatarImage"></user-avatar>    
        <md-menu-content>
            <md-menu-item @selected="logout()">Logout</md-menu-item>
        </md-menu-content>
    </md-menu>
    <router-link :to="'login'" tag="div" v-else>
        <md-button class="md-raised md-primary">Login</md-button>
    </router-link>-->
    <!--<router-link class="md-raised md-primary" to="/login" v-else tag="md-button">Login</router-link>-->
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
<!-- https://www.gravatar.com/avatar/559b2e9fe5620de0994a0de5180cd6eb -->