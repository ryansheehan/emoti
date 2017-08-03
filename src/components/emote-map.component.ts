import Vue from "vue";
import { Component, Prop, Watch, NoCache, mapGetters, mapActions, mapState } from "./vue-class-helpers";
import { Map, TileLayer, Marker } from "vue2-leaflet";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster";
import L from "leaflet";
import Location from "../location";
import { IEmotiLocation } from "../store/emoti.store";
import { Emoji, emojiCodePoint } from "../emoji-table";

import "leaflet/dist/leaflet.css";

type flyToFn = (location: Location, zoom?: number, opts?: any)=> any;

@Component({
    components: {
        "v-map": Map,
        "v-tilelayer": TileLayer,
        "v-marker": Marker,
        "v-marker-cluster": Vue2LeafletMarkercluster
    },

    methods: {
        ...mapActions("emoti", ["updateCenter", "updateRadius"])
    },

    computed: {
        ...mapGetters("emoti", ["emotis"])
    }
})
export default class LMap extends Vue {
    updateCenter:(c:Location)=> void; // mapActions
    updateRadius:(r:number)=> void; // mapActions

    @Prop()
    emojiOptions: { [shortname: string]: string };

    emojiIcons: { [emoji:string]: L.Icon } = {};

    leafletOptions: any = {
        attributionControl: false,
        zoomControl: false
    };

    showAttribution: boolean = false;

    @Prop({
        default: 13
    })
    zoom: number;

    @Prop({
        default: ()=>new Location({lat:0, lng:0})
    })
    center: Location;

    adjustZoom(relativeAmount: number): void {
        this.zoom += relativeAmount;
    }

    flyTo: flyToFn | null = null;

    async recenter(): Promise<any> {
        if(this.flyTo) {
            const l: Location = await Location.current();
            if(l.lat !== 0 && l.lng !== 0) {
                this.flyTo(l);
            }
        }
    }

    onMoveEnd(e: L.Event): void {
        if(e.target.flyTo) {
            this.flyTo = e.target.flyTo.bind(e.target);
        }
        this.updateCenterRadius(e.target.getCenter(), e.target.getBounds()._northEast, e.target.distance.bind(e.target));
    }

    private updateCenterRadius(_center:Location, _corner:Location, dist:(a:Location, b:Location)=>number): void {
        const r:number = Math.floor(dist(_center, _corner) / 1000.0);
        this.updateCenter(new Location(_center));
        this.updateRadius(r);
    }

    getIcon(emoji:string): L.Icon {
        return this.emojiIcons[emoji];
    }
    created(): void {
        Object.keys(this.emojiOptions).reduce<any>((r:{[emoji:string]: L.Icon}, sn:string)=> {
            const emoji:string = this.emojiOptions[sn];

            if(!(emoji in r)) {
                r[emoji] = L.icon({
                    iconUrl: `static/${emojiCodePoint[emoji]}.svg`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                });
            }

            return r;
        }, this.emojiIcons);
    }
}
