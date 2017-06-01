<script src="./emote-entry.component.ts" lang="ts"></script>

<template>
  <div>
    <form novalidate @submit.stop.prevent="testPost()">
      <emoji-picker></emoji-picker>
      <!--<md-input-container>
        <label>Emote</label>
        <md-input v-model="emote"></md-input>      
      </md-input-container>-->
      <!--<md-speed-dial md-direction="right">
        <md-button class="md-fab" md-fab-trigger>{{emote}}</md-button>
        <md-button class="md-fab md-primary md-mini md-clean" v-once>{{shortnameToUnicode(':smiley:')}}</md-button>
        <md-button class="md-fab md-primary md-mini md-clean" v-once>{{shortnameToUnicode(':frowning2:')}}</md-button>
      </md-speed-dial>-->
      <md-button type="submit" class="md-primary">Post</md-button>
    </form>    
  </div>
</template>

<style scoped>

</style>
