<script src="./emote-entry.component.ts" lang="ts"></script>

<template>
  <div>
    <form novalidate @submit.stop.prevent="testPost()">
      <div class="form-layout">
        <div class="emoji-container md-scrollbar">
          <!--<md-button-toggle md-single class="emoji-toggle">
            <md-button class="md-icon-button emoji"
                        v-for="(emoji, index) in emojiOptions" :key="index"
                        v-bind:class="{'md-toggle': emoji==emote}"
                        @click.native="emote = emoji"
                        v-once>
              {{emoji}}
            </md-button>
          </md-button-toggle>-->
          <emoji-picker v-model="emote" :options="emojiOptions" v-once></emoji-picker>
        </div>
        <md-button type="submit" class="md-primary md-raised post-emote">Post {{emote}}</md-button>
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

  .emoji-container {
    /*max-height: 600px;*/
    overflow: auto;
  }

  /*.emoji-toggle {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .emoji {
    font-size: 28px;
    min-height: 72px;
    min-width: 72px;
    color: black !important;
  }*/

  .post-emote {
    align-self: flex-end;
  }
</style>
