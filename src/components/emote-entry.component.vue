<script src="./emote-entry.component.ts" lang="ts"></script>

<template>
  <div>
    <form novalidate @submit.stop.prevent="testPost()">
      <div class="form-layout">
        <md-button-toggle md-single>
          <md-button class="md-icon-button emoji" 
                      v-for="(emoji, index) in emojiOptions" :key="index"
                      v-bind:class="{'md-toggle': emoji==emote}"                    
                      @click.native="emote = emoji">
            {{emoji}}
          </md-button>
        </md-button-toggle>
        <md-button type="submit" class="md-primary md-raised">Post</md-button>
      </div>
    </form>    
  </div>
</template>

<style scoped>
  .form-layout {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .emoji {
    font-size: 28px;
    min-height: 72px;
    min-width: 72px;
    color: black !important;
  }
</style>
