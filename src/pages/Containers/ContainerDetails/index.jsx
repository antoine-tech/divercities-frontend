import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import Autocomplete from "./Autocomplete";
import MapBox from "./MapBox";
import currentInformationsContext from "../../../context/index";

const ContainerDetails = () => {
  const { setCurrentInformations } = useContext(currentInformationsContext);
  setCurrentInformations("/conteneurs/details");

  const [selectedSensor, setSelectedSensor] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 43.5,
    longitude: 5,
    zoom: 9,
    pitch: 50,
  });

  useEffect(() => {
    console.log(selectedSensor);
  }, [selectedSensor]);

  return (
    <Row style={{ minHeight: "95vh", width: "100%" }}>
      <Col xs={12} style={{ position: "relative", zIndex: 0 }}>
        <MapBox
          height={"95vh"}
          width={"100vw"}
          viewState={viewState}
          mapStyle="mapbox://styles/antoine-tech/ckkv8yq1v3vof17nzaeb0gmi7"
          setViewState={setViewState}
          selectedSensor={selectedSensor}
        />
      </Col>
      <Autocomplete
        setViewState={setViewState}
        setSelectedSensor={setSelectedSensor}
        selectedSensor={selectedSensor}
      />
    </Row>
  );
};

export default ContainerDetails;
