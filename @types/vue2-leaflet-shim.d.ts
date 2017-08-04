declare module "vue2-leaflet" {
    import Vue from "vue";
    import L from "leaflet";

    export class GeoJSON extends Vue {}
    export class IconDefault extends Vue {}
    export class ImageOverlay extends Vue {}
    export class LayerGroup extends Vue {}
    export class LCircle extends Vue {}
    export class Map extends Vue {
        center: L.LatLng;
        bounds: L.LatLngBounds;
        zoom: number;
        minZoom: number;
        maxZoom: number;
        paddingBottomRight: L.Point;
        paddingTopLeft: L.Point;
        padding: L.Point;
        worldCopyJump: boolean;
        crs: L.CRS;
        options: L.MapOptions;
    }
    export class Marker extends Vue {
        draggable: boolean;
        visible: boolean;
        latLng: L.LatLng;
        icon: L.Icon;
        options: L.MarkerOptions;
    }
    export class Polygon extends Vue {}
    export class Popup extends Vue {}
    export class Rectangle extends Vue {}
    export class TileLayer extends Vue {}
    export class Tooltip extends Vue {}
    export class WMSTileLayer extends Vue {}
    export class WMSTileLayers extends Vue {}
}
