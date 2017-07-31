import Vue from "vue";
import { Component, Prop, NoCache, mapGetters, mapActions, mapState } from "./vue-class-helpers";
import { Map, TileLayer, Marker } from "vue2-leaflet";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster";
import L from "leaflet";
import Location from "../location";
import { IEmoti } from "../store/emoti.store";
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
        ...mapState("emoti", ["emotis"])
    }
})
export default class LMap extends Vue {
    updateCenter:(c:Location)=> void; // mapAction
    updateRadius:(r:number)=> void; // mapAction
    emotis: IEmoti[]; // mapState

    @Prop()
    emojiOptions: { [shortname: string]: string };

    emojiIcons: { [emoji:string]: L.Icon } = {};

    leafletOptions: any = {
        attributionControl: false,
        zoomControl: false
    };

    showAttribution: boolean = false;
    // center: Location = new Location({lat:33.2044240, lng:-96.9498580});
    // center: Location = new Location({lat:0, lng:0});

    zoom: number = 13;

    center: Location = new Location({lat:0, lng:0});

    adjustZoom(relativeAmount: number): void {
        this.zoom += relativeAmount;
    }

    flyTo: flyToFn | null = null;

    async recenter(): Promise<any> {
        if(this.flyTo) {
            const l: Location = await Location.current();
            if(l.lat !== 0 && l.lng !== 0) {
                this.flyTo(l, 13);
            }
        }
    }

    onMoveEnd(e: L.Event): void {
        if(e.target.flyTo) {
            this.flyTo = e.target.flyTo.bind(e.target);
        }

        const c:Location = e.target.getCenter();
        const bounds: {_northEast: Location, _southWest: Location} = e.target.getBounds();
        const r:number = Math.floor(e.target.distance(c, bounds._northEast) / 1000.0);

        this.updateCenter(new Location(c));
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

        Location.current().then(l => {
            this.updateCenter(l);
            this.center = l;
        });
    }
}
