import React, { useState } from "react";
import { Col} from "react-bootstrap";
import FilterGroup from "../../../components/FilterGroup";
import Toogler from "../../../components/Toogler/index";

const MapTrajetsFilters = ({
  sensorTypes,
  sensorDisplayed,
  setSensorDisplayed,
  selectedTrafficYear,
  setSelectedTrafficYear,
  selectedSensorType,
  setSelectedSensorType,
  trafficRoutierDataDisplayed,
  setTrafficRoutierDataDisplayed,
  hinterlandDisplayed,
  setHinterlandDisplayed,
  trajetsDisplayed,
  setTrajetsDisplayed,
}) => {
  const styles = {
    position: "fixed",
    zIndex: 1000000,
    left: 0,
    height: "100vh",
    bottom: 0,
    overflowY: "auto",
    overflowX: "hidden",
    transition: "transform .5s ease-in-out",
  };
  const [isToogled, setToogled] = useState(true);
  return (
    <>
      <Col
        xs={12}
        md={6}
        lg={3}
        className="bg-light d-block p-4 d-flex flex-column align-items-center justify-content-center"
        style={
          isToogled
            ? { ...styles, transform: "translateX(0)" }
            : { ...styles, transform: "translateX(-100vw)" }
        }
      >
        <div>
          <FilterGroup
            headerTop={true}
            filterHeader={"ANNEE TRAFFIC ROUTIER MOYEN"}
            items={["2012", "2013", "2014", "2015", "2016", "2017", "2018"]}
            selectedItem={selectedTrafficYear}
            setSelectedItem={setSelectedTrafficYear}
          />

          {sensorTypes && (
            <FilterGroup
              headerTop={true}
              filterHeader={"TYPE DE CAPTEUR"}
              items={sensorTypes}
              selectedItem={selectedSensorType}
              setSelectedItem={setSelectedSensorType}
            />
          )}

          <FilterGroup
            headerTop={true}
            filterHeader={"DONNEES DES CAPTEURS"}
            items={["ON", "OFF"]}
            selectedItem={sensorDisplayed}
            setSelectedItem={setSensorDisplayed}
          />

          <FilterGroup
            headerTop={true}
            filterHeader={"DONNEES DU TRAFFIC ROUTIER MOYEN"}
            items={["ON", "OFF"]}
            selectedItem={trafficRoutierDataDisplayed}
            setSelectedItem={setTrafficRoutierDataDisplayed}
          />

          <FilterGroup
            headerTop={true}
            filterHeader={"HINTERLANDS FLUVIAL"}
            items={["ON", "OFF"]}
            selectedItem={hinterlandDisplayed}
            setSelectedItem={setHinterlandDisplayed}
          />

          <FilterGroup
            headerTop={true}
            filterHeader={"TRAJETS CONTENEURS"}
            items={["ON", "OFF"]}
            selectedItem={trajetsDisplayed}
            setSelectedItem={setTrajetsDisplayed}
          />
        </div>
      </Col>

      <Toogler setToogled={setToogled} isToogled={isToogled} />
    </>
  );
};

export default MapTrajetsFilters;
