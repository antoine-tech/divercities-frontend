import React, {useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Col } from 'react-bootstrap';
import Plotly3dScatterPlot from '../../../../components/Plotly3dScatterPlot/index';
import { format } from 'date-fns';

const MapBox = ({
  setViewState,
  viewState,
  height,
  width,
  mapStyle,
  selectedSensor,
}) => {
  const [popupInfo, setPopupInfo] = useState(false);

  return (
    <ReactMapGL
      mapboxApiAccessToken={window.env.MAPBOX_TOKEN}
      mapStyle={mapStyle}
      height={height}
      width={width}
      viewState={viewState}
      onViewportChange={(newViewState) => setViewState(newViewState)}
    >
      {selectedSensor?.sensor_details.map((sensor, index) => {
        return (
          <Marker
            key={`marker-${index}`}
            longitude={sensor.gps.lon}
            latitude={sensor.gps.lat}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
              fill={sensor.sensor_name === "ACC_RAW_VALUES" ? "#D2122E" : "#515151"}
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
              onClick={() => setPopupInfo({ ...selectedSensor, ...sensor })}
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
          </Marker>
        );
      })}

      {popupInfo && (
        <Popup
          key={`popup-${popupInfo._id}`}
          latitude={popupInfo.gps.lat}
          longitude={popupInfo.gps.lon}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
          anchor="bottom"
          className="z-top"
        >
          {console.log(popupInfo.sensor_values)}
          <Col xs={12} className="p-4">
            <h3 className="text-center">Resumé de l&apos;evenement: </h3>
            <hr/>
            <p><b>Equipement Number : </b> {selectedSensor._id}</p>
            <p>
              <b>Donnée collectée le : </b>
              {format(new Date(popupInfo.gps_date), "dd MMMM yyyy - hh:mm")}
            </p>
            <p><b>Type de capteur : </b>{popupInfo.sensor_name}</p>
            {popupInfo.sensor_name === "CPU_TEMP" && (
              <>
                <p><b>température relevé : </b>{popupInfo.sensor_value} °C</p>
              </>
            )}
            {popupInfo.sensor_name === "DOOR" && (
              <>
                <p><b>Etat des portes : </b> {popupInfo.sensor_value} °C</p>
              </>
            )}
            
            {popupInfo.sensor_name === "ACC_RAW_VALUES" && (
              <Plotly3dScatterPlot
                data={[
                  {
                    x: [
                      parseInt(popupInfo.sensor_values.sensor_values["ACC_MAX_X"]),
                      parseInt(popupInfo.sensor_values.sensor_values["ACC_RMS_X"])
                  ],
                    y: [
                      parseInt(popupInfo.sensor_values.sensor_values["ACC_MAX_Y"]),
                      parseInt(popupInfo.sensor_values.sensor_values["ACC_RMS_Y"])
                    ],
                    z: [
                      parseInt(popupInfo.sensor_values.sensor_values["ACC_MAX_Z"]),
                      parseInt(popupInfo.sensor_values.sensor_values["ACC_RMS_Z"])
                    ],
                    mode: "markers",
                    type: "scatter3d",
                  },
                ]}
                magnitude={popupInfo.sensor_values.sensor_values.ACC_MAX_MAGNITUDE}
              />
            )}
          </Col>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default MapBox;
