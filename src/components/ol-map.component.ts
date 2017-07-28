import Vue from "vue";
import { Component, Prop, Watch, NoCache, mapActions, mapState } from "./vue-class-helpers";
import { IEmoti } from "../store/emoti.store";
import { Location } from "../location";
import { Extent } from "../extent";
import {emojiCodePoint, shortNameEmoji, emojiShortName} from "../emoji-table";
import { Map, layer, View, source, proj, geom, style, ObjectEvent, Attribution, Sphere, Feature } from "openlayers";
// import "../../node_modules/openlayers/dist/ol.css";


@Component({
    methods: {
        ...mapActions("emoti", ["updateCenter", "updateRadius"])
    },
    computed: {
        ...mapState("emoti", ["emotis"])
    }
})
export default class OlMap extends Vue {
    updateCenter:(loc:Location)=>void; // mapAction
    updateRadius:(radius:number)=>void; // mapAction

    @Watch("emotis")  // emotis from mapState
    onEmotisChanged(emotis:IEmoti[]): void {

        const features = emotis.map((emoti:IEmoti)=>{
            const feature = new Feature({
                // geometry: new geom.Point(emoti.location.toLongLat()),
                geometry: new geom.Point([0,0]),
                name: emojiShortName[emoti.emote].replace("_", " ")
            });

            feature.setStyle(this._styleMap[emoti.emote])

            return feature;
        });

        //console.log("adding features: ", features);
        //this._vectorLayer.getSource().addFeatures(features);
    }

    private _map:Map;

    private _view:View;

    emojiAssetNames:string[] = ["grinning", "slight_smile", "neutral_face", "frowning2", "angry"];

    private _vectorLayer: layer.Vector;
    private _styleMap: {[emoji:string]: style.Style};

    showAttribution:boolean = false;
    get attributionHtml():string {
        return source.OSM.ATTRIBUTION.getHTML();
    }

    @NoCache
    get center():Location {
        return Location.fromLongLat(proj.toLonLat(this._map.getView().getCenter()));
    }
    set center(value:Location) {
        // this.updateCenter(value);
        if(this._view) {
            this._view.setCenter(proj.fromLonLat(value.toLongLat()));
        }
    }

    @NoCache
    get zoom():number {
        return this._map.getView().getZoom();
    }
    set zoom(value:number) {
        if(this._view) {
            this._view.setZoom(value);
        }
        this.updateRadius(this.calculateRadius());
    }

    adjustZoom(relativeAmount: number): void {
        const zoom:number = this.zoom;
        this._view.animate({
            zoom: zoom + relativeAmount,
            duration: 500
        });
    }

    private calculateRadius(): number {
        const wgs84Sphere: Sphere = new Sphere(6378137);
        const sourceProj: proj.Projection = this._view.getProjection();

        const arrExtent: [number, number] = proj.toLonLat(<[number,number]>(this._view.calculateExtent(this._map.getSize()).slice(0,2)));
        const center: [number,number] = proj.toLonLat(this._map.getView().getCenter());

        const haversineDist: number = wgs84Sphere.haversineDistance(center, arrExtent) / 1000.0;

        return haversineDist;
    }

    async recenter():Promise<any> {
        const loc:Location = await Location.current();
        // this.updateCenter(loc);
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
        this._styleMap = this.emojiAssetNames.reduce<any>((r:{[e:string]: style.Style}, sn:string)=> {
            const e: string = shortNameEmoji[sn];
            r[e] = new style.Style({
                image: new style.Icon({
                    src: `/static/${emojiCodePoint[e]}.svg`,
                    anchor: [0.5,0.5],
                    anchorXUnits: "fraction",
                    anchorYUnits: "fraction",
                    rotateWithView: true,
                    size: [25,25]
                })
            });
            return r;
        }, {});

        // [-96.9498580, 33.2044240] // "EPSG:4326"
        const testFeature = new Feature(new geom.Circle(proj.fromLonLat([-96.9498580, 33.2044240])));

        const testStyle = this._styleMap[shortNameEmoji["grinning"]];

        console.log("testStyle: ", testStyle);

        testFeature.setStyle(testStyle);

        this._vectorLayer = new layer.Vector({
            source: new source.Vector({
                features: [testFeature]
            })
        });

        this._map = new Map({
            target: <HTMLElement>this.$el.querySelector(".openlayers-slot"),
            layers: [
                new layer.Tile({
                    source: new source.OSM()
                }),

                this._vectorLayer
            ],
            controls: [], // remove default controls, so we can overlay our own
            view: this._view
        });

        // vectorLayer.getSource().addFeature({})
        // vectorLayer.getSource().addFeatures([{}, {}])

        this._map.on("moveend", (e:ObjectEvent)=> {
            this.updateCenter(this.center);
            this.updateRadius(this.calculateRadius());
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
