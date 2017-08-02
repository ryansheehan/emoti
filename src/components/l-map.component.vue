<script src="./l-map.component.ts" lang="ts"></script>

<template>
    <div class="l-map">
        <div class="leaflet-slot">
            <v-map
                :zoom="zoom"
                :center="center"
                :options="leafletOptions"
                v-on:l-moveend="onMoveEnd">
                <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                 <v-marker-cluster>
                    <v-marker   v-for="emoti in emotis"
                                :key="emoti.key"
                                :lat-lng="emoti.location.toLatLng()"
                                :icon="getIcon(emoti.emote)">
                    </v-marker>
                 </v-marker-cluster>
            </v-map>
        </div>
        <div class="map-control-overlay">
            <div class="attribution-container">
                <md-button class="attribution-button md-icon-button md-raised md-accent" @click.native="showAttribution=!showAttribution">
                    <transition name="switch">
                        <md-icon v-if="showAttribution" key="expand-icon">navigate_before</md-icon>
                        <md-icon v-else key="collapse-icon">info</md-icon>
                    </transition>
                </md-button>
                <transition name="show">
                    <md-whiteframe class="attribution-content-container" v-show="showAttribution">
                        <div class="attribution-content">© <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</div>
                    </md-whiteframe>
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
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

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
    z-index: 400;
}

.attribution-content-container {
    padding: 0px 10px;
    background-color: white;
    overflow: hidden;
    white-space: nowrap;
    max-width: 250px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
}

.attribution-content {
    /*overflow: hidden;*/
    /*text-overflow: clip;*/
}

.show-enter-active, .show-leave-active {
    transition: all 0.5s
}

.show-enter, .show-leave-to {
    max-width: 0px;
    padding: 0px;
}

.attribution-button {
    opacity: 1;
    margin-right: -2px;
}

.switch-enter-active, .switch-leave-active {
    transition: all 0.5s;
}

.switch-enter, .switch-leave-to {
    opacity: 0;
    transform: rotate(-360deg);
}


.spacer {
    flex: 1;
}

.center-zoom-container {
    display: inline-flex;
    flex-flow: column nowrap;
    position: relative;
    margin: 6px;
    z-index: 400;
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

.l-map {
    position: relative;
    height: 100%;
}
.leaflet-slot {
    position: absolute;
    height: 100%;
    width:100%;
    /* z-index: -1; */
}
</style>
