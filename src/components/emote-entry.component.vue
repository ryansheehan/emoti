<script src="./emote-entry.component.ts" lang="ts"></script>

<template>
    <div class="emote-entry">
        <div class="emote-map">
            <v-map :zoom="13" :center="[33.0657810, -96.8022750]">
                <v-tilelayer :url="'http://{s}.tile.osm.org/{z}/{x}/{y}.png'" />
            </v-map>
        </div>
        <div class="emote-form">
            <form novalidate @submit.stop.prevent="post(emoti)">
                <div class="form-layout">
                    <emoji-picker class="emoji-container md-scrollbar" v-model="emote" :options="emojiOptions" v-once />
                    <md-button type="submit" class="md-primary md-raised post-emote">Post {{emote}}</md-button>
                </div>
            </form>
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
    background-color: red;
}

.emote-form {
    flex: none;
    background-color: lightgray;
}

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
