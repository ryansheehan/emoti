<script src="./emoji-picker.component.ts" lang="ts"></script>

<template>
    <div>
        <!--<md-button class="md-raised" @click.native="toggleShow()">Toggle</md-button>-->
        <!--<div v-if="show">
            <div v-html="testTag"></div>
        </div>-->
        <!--<md-input-container>
            <label>Search</label>
            <md-input v-model="searchTerm"></md-input>
        </md-input-container>
        <div class="emoji-list">
            <div v-for="(shortname, index) in searchResults" :key="index" v-html="shortname"></div>
        </div>-->


        <md-tabs md-centered>
            <md-tab md-label="People" md-icon="mood">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in people" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
            <md-tab md-label="Symbols" md-icon="favorite border">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in symbols" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
            <md-tab md-label="Objects" md-icon="radio">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in objects" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
            <md-tab md-label="Nature" md-icon="wb_sunny">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in nature" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
            <md-tab md-label="Food" md-icon="restaurant">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in food" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
            <md-tab md-label="Travel" md-icon="flight">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in travel" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
            <md-tab md-label="Activity" md-icon="golf_course">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in activity" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
            <md-tab md-label="Flags" md-icon="flag">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in flags" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
            <md-tab md-label="Regional" md-icon="report problem">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in regional" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
            <md-tab md-label="Modifier" md-icon="report problem">
                <div class="emoji-list md-scrollbar">
                    <div v-for="(tag, index) in modifier" :key="index" v-html="tag"></div>
                </div>
            </md-tab>
        </md-tabs>
    </div>
</template>

<style scoped>
.emoji-list {
    display: flex;
    flex-flow: row wrap;
    overflow: auto;
    height: 300px;
}
</style>
