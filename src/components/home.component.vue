<script src="./home.component.ts" lang="ts"></script>

<template>
    <div>
        <!-- class="md-dense" -->
        <md-toolbar >
            <md-button class="md-icon-button">
                <md-icon>menu</md-icon>
            </md-button>

            <h2 class="md-title" style="flex: 1">Emotivent</h2>

            <user-avatar :user="currentUser" :logout="logout"/>
        </md-toolbar>
        <event-entry></event-entry>
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
