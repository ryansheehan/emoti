<script src="./emoji-picker.component.ts" lang="ts"></script>

<template>
    <div>
        <!--<md-button class="md-raised" @click.native="toggleShow()">Toggle</md-button>-->
        <!--<div v-if="show">
            <div v-html="testTag"></div>
        </div>-->
        <md-input-container>
            <label>Search</label>
            <md-input v-model="searchTerm"></md-input>
        </md-input-container>
        <div class="emoji-list">
            <div v-for="(shortname, index) in searchResults" :key="index" v-html="shortname">
                <!--<span v-html="shortname"></span>-->
            </div>
        </div>
    </div>
</template>

<style scoped>
.emoji-list {
    display: flex;
    flex-flow: row wrap;
}
</style>
