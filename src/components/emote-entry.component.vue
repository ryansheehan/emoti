<script src="./emote-entry.component.ts" lang="ts"></script>

<template>
  <div>
    <form novalidate @submit.stop.prevent="testPost()">
      <div class="form-layout">
        <emoji-picker class="emoji-container md-scrollbar"
                      v-model="emote"
                      :options="emojiOptions"
                      v-once />
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
    max-height: 600px;
    overflow: auto;
  }

  .post-emote {
    align-self: flex-end;
  }
</style>
