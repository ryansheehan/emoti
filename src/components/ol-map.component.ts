import Vue from "vue";
import { Component, Prop, Watch, NoCache } from "./vue-class-helpers";
import { Location } from "../location";
import { Map, layer, View, source, proj, ObjectEvent, Attribution } from "openlayers";
// import "../../node_modules/openlayers/dist/ol.css";


@Component
export default class OlMap extends Vue {
    private _map:Map;

    private _view:View;

    showAttribution:boolean = false;
    get attributionHtml():string {
        return source.OSM.ATTRIBUTION.getHTML();
    }

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

    adjustZoom(relativeAmount: number): void {
        const zoom:number = this.zoom;
        this._view.animate({
            zoom: zoom + relativeAmount,
            duration: 500
        });
    }

    async recenter():Promise<any> {
        const loc:Location = await Location.current();
        const dest:[number, number] = proj.fromLonLat(loc.toLongLat());

        const duration:number = 2000;
        const zoom:number = this._view.getZoom();
        let parts:number = 2;
        let called:boolean = false;

        return new Promise<any>((resolve)=> {
            function callback(complete:boolean): void {
                --parts;
                if (called) {
                    return;
                }
                if (parts === 0 || !complete) {
                    called = true;
                    resolve(complete);
                }
            }

            this._view.animate({
                center: dest,
                duration: duration
            }, callback);

            this._view.animate({
                zoom: zoom - 2,
                duration: duration / 2
            }, {
                zoom: zoom,
                duration: duration / 2
            }, callback);
        });
    }

    beforeCreate():void {
        this._view = new View({
            center: proj.fromLonLat([-96.9498580, 33.2044240]),
            zoom: 10
        });
    }

    mounted():void {
        this._map = new Map({
            target: <HTMLElement>this.$el.querySelector(".openlayers-slot"),
            layers: [
                new layer.Tile({
                    source: new source.OSM()
                })
            ],
            controls: [], // remove default controls, so we can overlay our own
            view: this._view
        });

        this._map.on("moveend", (e:ObjectEvent)=> {
            this.$emit("update:center", this.center);
            this.$emit("update:zoom", this.zoom);
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
