<script src="./emoji-picker.component.ts" lang="ts"></script>

<template>
    <md-button-toggle md-single class="emoji-toggle">
        <md-button class="md-icon-button"
                    v-once
                    v-for="(emoji, shortname) in options" :key="shortname"
                    :class="{'md-toggle': emoji==value}"
                    @click.native="update(emoji)">
            <md-icon :md-src="getEmojiSvgPath(emoji)"></md-icon>
        </md-button>
    </md-button-toggle>
</template>

<style scoped>
.emoji-toggle {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

</style>
