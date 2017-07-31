<script src="./emote-entry.component.ts" lang="ts"></script>

<template>
    <div class="emote-entry">
        <div class="emote-form">
            <form novalidate @submit.stop.prevent="post(emoti)">
                <div class="form-layout">
                    <emoji-picker class="emoji-container md-scrollbar" v-model="emote" :options="emojiOptions" v-once ></emoji-picker>
                    <md-button type="submit" class="md-primary md-raised post-emote">Post <img class="post-icon" :src="getEmojiSvgPath(emote)"></img></md-button>
                </div>
            </form>
        </div>
        <div class="emote-map">
            <!-- <ol-map>
            </ol-map> -->
             <l-map :emojiOptions="emojiOptions"></l-map>
        </v-map>
        </div>
    </div>
</template>

<style scoped>
.emote-entry {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.emote-map {
    flex: 1;
}

.emote-form {
    flex: none;
    background-color: gray;
}

.form-layout {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
}

.emoji-container {
    max-height: 600px;
    overflow: auto;
    flex: 1;
}

.post-emote {
    align-self: flex-end;
}

.post-icon {
    max-width: 1em;
    max-height: 1em;
}

</style>
