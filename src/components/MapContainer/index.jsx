import React from "react";
import DeckGL from "@deck.gl/react";
import env from "react-dotenv";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { scaleQuantize } from "d3-scale";
import { StaticMap } from "react-map-gl";
import { GeoJsonLayer, ArcLayer } from "@deck.gl/layers";
import { HexagonLayer, HeatmapLayer } from "@deck.gl/aggregation-layers";
import { MapLocationMarkers } from "../icons/MapLocationOverlay";

mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapContainer = ({
  height,
  width,
  viewState,
  mapStyle,
  trafficRoutierData,
  sensors,
  hinterlands,
  trafficRoutierDataDisplayed,
  sensorDisplayed,
  hinterlandDisplayed,
  trajets,
  trajetsDisplayed,
}) => {
  const colors = [
    [221, 119, 110, 255],
    [231, 154, 105, 255],
    [233, 184, 97, 255],
    [212, 200, 106, 255],
    [148, 189, 119, 255],
    [87, 187, 138, 255],
  ];

  const color = scaleQuantize().domain([0, 2500]).range(colors);

  function getColor(element) {
    return color(element.properties.cumuld);
  }

  const geoJsonLayerTrafficRoutierNational = new GeoJsonLayer({
    id: "geojson-layer",
    data: trafficRoutierData,
    pickable: true,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 10,
    opacity: 1,
    getLineColor: getColor,
    getFillColor: getColor,
  });

  const hexagonLayer =
    sensors[0].sensor_name === "CPU_TEMP"
      ? new HeatmapLayer({
        id: 'heatmapLayer',
        data: sensors,
        getPosition: (d) => d.coordinates,
        getWeight: (d) => parseInt(d.sensor_value),
        aggregation: 'SUM'
      })
      : new HexagonLayer({
          id: "hexagon-layer",
          data: sensors,
          pickable: true,
          extruded: true,
          radius: 1000,
          elevationScale: 20,
          getPosition: (d) => d.coordinates,
        });

  const arcsLayer = new ArcLayer({
    id: "arc-layer",
    data: trajets,
    pickable: true,
    getWidth: 2,
    getSourcePosition: (d) => [d.start_lon, d.start_lat],
    getTargetPosition: (d) => [d.end_lon, d.end_lat],
    getSourceColor: [150, 178, 69, 100],
    getTargetColor: [159, 46, 30, 100],
  });

  const layers = [
    trafficRoutierDataDisplayed === "ON" && geoJsonLayerTrafficRoutierNational,
    sensorDisplayed === "ON" && hexagonLayer,
    trajetsDisplayed === "ON" && arcsLayer,
  ];

  return (
    <DeckGL
      initialViewState={viewState}
      controller={true}
      layers={layers}
      height={height}
      width={width}
    >
      <StaticMap
        mapboxApiAccessToken={env.MAPBOX_TOKEN}
        mapStyle={mapStyle}
        height={height}
        width={width}
      >
        {hinterlandDisplayed === "ON" && (
          <MapLocationMarkers
            data={hinterlands}
            id={"hinterlands"}
            markerFillColor="#4B78B4"
            markerSize={[12, 12]}
          />
        )}
      </StaticMap>
    </DeckGL>
  );
};

export default MapContainer;
