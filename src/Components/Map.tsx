import * as React from "react";
import mapboxgl from "mapbox-gl";
import "../styles/Map.css";
import MagnitudeContext from "../Contexts/magnitude-context";
import ThemeContext from "../Contexts/theme-context";
const accessToken =
    "pk.eyJ1IjoiamFja3NvbnNpbmdsZXRvbiIsImEiOiJjajhxMjA1N2QwZW0wMnhxdWUwdmRxOTM0In0.U7N0I-68nKYeAdnCW20ZcQ";

type MapProps = {
    features: any[];
};
function Map({ features }: MapProps) {
    const [map, setMap] = React.useState<mapboxgl.Map>();
    const { magnitude, setMagnitude } = React.useContext(MagnitudeContext);
    const { theme, setTheme } = React.useContext(ThemeContext);
    const mapNode = React.useRef(null);

    function addMarker(marker: any, map: mapboxgl.Map, minMag: number = 5, element: HTMLElement) {
        if (marker.properties.mag < minMag) {
            return;
        }

        let scale = Math.min(Math.max(marker.properties.mag * 0.5, 0.75), 10);
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${marker.properties.place}</h3><hr /><p>Magnitude: ${marker.properties.mag}</p><p>Date: ${new Date(marker.properties.time)}</p>`
        );
        new mapboxgl.Marker({ color: "orangered", scale, element })
            .setLngLat([
                marker.geometry.coordinates[0],
                marker.geometry.coordinates[1],
            ])
            .setPopup(popup)
            .addTo(map);
        element.style.width = `${scale * 20}px`;
        element.style.height = `${scale * 20}px`;
        if(marker.properties.mag < 3){
            element.style.backgroundColor = "#FF940D";
        }
        else if(marker.properties.mag > 5){
            element.style.backgroundColor = "#FF0D22";
        }
    }

    React.useEffect(() => {
        const node = mapNode.current;
        if (typeof window === "undefined" || node === null) return;

        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: accessToken,
            style: `mapbox://styles/mapbox/${theme}-v10`,
            center: [-95.72, 37.09],
            zoom: 4,
            attributionControl: false,
        });
        for (const feature of features) {
            const el = document.createElement("div");
            el.className = "marker";
            addMarker(feature, mapboxMap, magnitude, el);
        }
        //show navigation controls
        mapboxMap.addControl(new mapboxgl.NavigationControl());
        mapboxMap.scrollZoom.disable();
        setMap(mapboxMap);
        return () => {
            mapboxMap.remove();
        };
    }, [features, magnitude, theme]);
    const nav = new mapboxgl.NavigationControl();
    return <div ref={mapNode} className="map-node"></div>;
}

export default Map;
