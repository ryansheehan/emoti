import Vue from "vue";
import { Component, Prop, Watch, NoCache } from "./vue-class-helpers";
import { Location } from "../location";
import { Map, layer, View, source, proj, ObjectEvent } from "openlayers"
import "../../node_modules/openlayers/dist/ol.css";


@Component
export default class OlMap extends Vue {
    private _map:Map;

    private _view:View;

    @NoCache
    get center():Location {
        return Location.fromLongLat(proj.toLonLat(this._map.getView().getCenter()));
    }
    set center(value:Location) {
        this._view.setCenter(proj.fromLonLat(value.toLongLat()));
    }

    @NoCache
    get zoom():number {
        return this._map.getView().getZoom();
    }
    set zoom(value:number) {
        this._view.setZoom(value);
    }

    beforeCreate() {
        this._view = new View({
            center: proj.fromLonLat([-96.9498580, 33.2044240]),
            zoom: 10
        });
    }

    mounted() {
        this._map = new Map({
            target: this.$el,
            layers: [
                new layer.Tile({
                    source: new source.OSM()
                })
            ],
            view: this._view
        });

        this._map.on('moveend', (e:ObjectEvent)=> {
            // console.log('moveend: ', e)
            this.$emit('update:center', this.center);
            this.$emit('update:zoom', this.zoom);
        });

        // this._view.on('change:resolution', (e:ObjectEvent)=>{
        //     console.log('resolution: ', e)
        //     this.$emit('change:resolution', this.zoom);
        // });

        // this._view.on('change:center', (e:ObjectEvent)=> {
        //     console.log('center: ', e)
        //     this.$emit('change:center', this.center);
        // });
    }
}
