import React from "react";
import ReactMapGL from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { MapLocationMarkers } from "../icons/MapLocationOverlay";
import { ArcLayer } from "@deck.gl/layers";
import env from "react-dotenv";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapPorts = ({
  height,
  width,
  viewState,
  onViewStateChange,
  mapStyle,
  ports,
  trajets,
  hinterlands,
  toileIndustrialoPortuaires,
  portsDisplayed,
  hinterlandsDisplayed,
  trajetsDisplayed,
  toileIndustrialoPortuairesDisplayed,
  marseilleRelatedPorts,
  selectedRegionRelation,
}) => {
  const arcLayer = new ArcLayer({
    id: "arc-layer",
    data: trajets,
    pickable: true,
    getWidth: 1,
    getSourcePosition: (d) => [d.startLng, d.startLat],
    getTargetPosition: (d) => [d.endLng, d.endLat],
    getSourceColor: [150, 178, 69, 100],
    getTargetColor: [159, 46, 30, 100],
  });

  const layers = [arcLayer];

  const getMarseilleRelatedPorts = () => {
    if (marseilleRelatedPorts[selectedRegionRelation]) {
      return marseilleRelatedPorts[selectedRegionRelation];
    } else {
      let results = [];
      for (const key in marseilleRelatedPorts) {
        results = [...results, ...marseilleRelatedPorts[key]];
      }
      return results;
    }
  };
  const marseille_related_ports = getMarseilleRelatedPorts();

  return (
    <ReactMapGL
      mapboxApiAccessToken={env.MAPBOX_TOKEN}
      width={width}
      height={height}
      viewState={viewState}
      onViewStateChange={onViewStateChange}
      style={{ position: "relative", zIndex: 0 }}
      mapStyle={mapStyle}
    >
      <DeckGL
        viewState={viewState}
        layers={trajetsDisplayed === "ON" ? layers : []}
      >
        {portsDisplayed === "ON" && (
          <MapLocationMarkers
            data={ports}
            id={"portname"}
            markerFillColor="#515151"
            markerSize={[8, 8]}
          />
        )}
        {hinterlandsDisplayed === "ON" && (
          <MapLocationMarkers
            data={hinterlands}
            id={"ville"}
            markerFillColor="#4B78B4"
            markerSize={[8, 8]}
          />
        )}
        {toileIndustrialoPortuairesDisplayed === "ON" && (
          <MapLocationMarkers
            data={toileIndustrialoPortuaires}
            id={"activites"}
            markerFillColor="#EB8A35"
            markerSize={[6, 6]}
          />
        )}

        {marseille_related_ports && (
          <MapLocationMarkers
            data={marseille_related_ports}
            id={""}
            markerFillColor="#B23624"
            markerSize={[16, 16]}
          />
        )}
      </DeckGL>
    </ReactMapGL>
  );
};

export default MapPorts;
