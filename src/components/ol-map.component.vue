<script src="./ol-map.component.ts" lang="ts"></script>

<template>
    <div class="ol-map">
        <div class="openlayers-slot"></div>
        <div class="map-control-overlay">
            <div class="attribution-container">
                <md-button class="attribution-button md-icon-button md-raised" @click.native="showAttribution=!showAttribution">
                    <md-icon v-if="showAttribution">navigate_before</md-icon>
                    <md-icon v-else>info</md-icon>
                </md-button>
                <transition name="attribution-show">
                    <div class="attribution-content" v-show="showAttribution" v-html="attributionHtml"/>
                </transition>
            </div>
            <div class="spacer"/>
            <div class="center-zoom-container">
                <md-whiteframe class="center-container">
                    <md-button class="center-zoom-button" @click.native="recenter()"><md-icon>gps_fixed</md-icon></md-button>
                </md-whiteframe>
                <md-whiteframe class="zoom-container">
                    <md-button class="center-zoom-button" @click.native="adjustZoom(1)"><md-icon>add</md-icon></md-button>
                    <md-divider class="zoom-divider"></md-divider>
                    <md-button class="center-zoom-button" @click.native="adjustZoom(-1)"><md-icon>remove</md-icon></md-button>
                </md-whiteframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
.map-control-overlay {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: flex-end;
}

.attribution-container {
    position: relative;
    display: inline-flex;
    flex-flow: row wrap;
    align-items: center;
    margin: 6px;
    /*background-color: white;*/
}

.attribution-button {
    background-color: white;
}

.attribution-show-enter-active, .attribution-show-leave-active {

}

.attribution-show-enter, .attribution-show-leave-to {

}

.attribution-content {
    /*background-color: white;*/
}

.spacer {
    flex: 1;
}

.center-zoom-container {
    display: inline-flex;
    flex-flow: column nowrap;
    position: relative;
    margin: 6px;
}

.center-container {
    background-color: rgba(255,255,255,1);
    margin-bottom: 4px;
}

.zoom-container {
    display: flex;
    background-color: rgba(255,255,255,1);
    flex-flow: column nowrap;
}

.zoom-divider {
    margin-left: 6px;
    margin-right: 6px;
}

.center-zoom-button {
    margin: 0px;
    padding: 0px;
    min-width: 36px !important;
    min-height: 36px !important;
    max-width: 36px !important;
    max-height: 36px !important;
}

.ol-map {
    position: relative;
    height: 100%;
}
.openlayers-slot {
    position: absolute;
    height: 100%;
    width:100%;
}

</style>
