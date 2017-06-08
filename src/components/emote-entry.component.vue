<script src="./emote-entry.component.ts" lang="ts"></script>

<template>
  <div>
    <form novalidate @submit.stop.prevent="testPost()">      
      <md-button type="submit" class="md-primary">Post</md-button>
    </form>    
  </div>
</template>

<style scoped>

</style>
