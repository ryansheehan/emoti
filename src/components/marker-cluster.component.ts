// forked from vu2-leaflet-markercluster @ https://github.com/jperelli/vue2-leaflet-markercluster

import Vue from "vue";
import { Component, Prop } from "./vue-class-helpers";
import {Map} from "vue2-leaflet";
import L from "leaflet";
import "leaflet.markercluster";

@Component
export default class MarkerCluster extends Vue {
    mapObject: L.MarkerClusterGroup;
    parent: L.LayerGroup | L.Map;

    @Prop({
        type: Boolean,
        default: true
    })
    visible: boolean;

    @Prop({
        type: Object,
        default: ()=> {
            return {

            };
        }
    })
    options: L.MarkerClusterGroupOptions;

    mounted(): void {
        this.mapObject = L.markerClusterGroup(this.options);
        if((<any>this.$parent)._isMounted) {
            this.deferredMountedTo((<any>this.$parent).mapObject);
        }
    }

    deferredMountedTo(parent: L.LayerGroup | L.Map): void {
        this.parent = parent;
        for(let i: number = 0; i < this.$children.length; i++) {
            (<any>this.$children[i]).deferredMountedTo(this.mapObject);
        }
        if(this.visible) {
            this.mapObject.addTo(parent);
        }
    }

    setVisible(newVal: boolean, oldVal: boolean): void {
        if(newVal === oldVal) {
            return;
        }
        if(this.mapObject) {
            if(newVal) {
                this.mapObject.addTo(this.parent);
            } else {
                (<any>this.parent).removeLayer(this.mapObject);
            }
        }
    }
}
