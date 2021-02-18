import React, { useMemo } from "react";
import { Marker } from "react-map-gl";

const MarkerGroup = ({ data, markerFillColor, id, markerSize }) => {
  return (
    <Marker
      latitude={data.lat}
      longitude={data.lon}
      offsetLeft={-20}
      offsetTop={-10}
      id={data[id]}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={markerSize[0]}
        height={markerSize[1]}
        fill={markerFillColor}
        className="bi bi-geo-alt-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
      </svg>
    </Marker>
  );
};

const MapLocationMarkers = ({
  id,
  data,
  markerFillColor = "#282828",
  markerSize = [8, 8],
}) => {
  const markers = useMemo(
    () =>
      data.map((d, index) => (
        <MarkerGroup
          id={d[id]}
          data={d}
          markerSize={markerSize}
          markerFillColor={markerFillColor}
          key={id + index}
        />
      )),
    [data]
  );

  return markers;
};

export { MapLocationMarkers };
