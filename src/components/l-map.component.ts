import Vue from "vue";
import { Component, Prop, NoCache } from "./vue-class-helpers";
import { Map, TileLayer } from "vue2-leaflet";
import L from "leaflet";
import Location from "../location";

import "leaflet/dist/leaflet.css";



@Component({
    components: {
        "v-map": Map,
        "v-tilelayer": TileLayer
    }
})
export default class LMap extends Vue {
    leafletOptions: any = {
        attributionControl: false,
        zoomControl: false
    };

    showAttribution: boolean = false;
    // center: Location = new Location({lat:33.2044240, lng:-96.9498580});
    // center: Location = new Location({lat:0, lng:0});
    center: Location = new Location({ lat: 0, lng: 0 });

    zoom: number = 13;

    adjustZoom(relativeAmount: number): void {
        this.zoom += relativeAmount;
    }

    async recenter(): Promise<any> {
        return new Promise<any>((resolve) => {
            console.log("recenter()");
            resolve();
        });
    }

    moved(e: L.Event): void {
        // this.center = new Location(e.target.getCenter());
        console.log("moveend, ", e.target.getCenter());
    }

    created(): void {
        Location.current().then(l => this.center = l);
    }
}
