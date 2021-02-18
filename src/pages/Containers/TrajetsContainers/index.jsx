import React, { useState, useEffect, useContext } from "react";
import { Container, Spinner } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import MapContainer from "../../../components/MapContainer";
import {
  getTrafficRoutierData,
  getSensorsPosition,
  getSensorTypes,
  getHinterlands,
  getTrajetsContainers,
} from "../../../API_CLIENT/index";
import MapTrajetsFilters from "../MapTrajetsFIlters";
import { useHistory } from "react-router-dom";
import currentInformationsContext from "../../../context/index";

const TrajetsContainers = () => {
  const { setCurrentInformations } = useContext(currentInformationsContext);
  setCurrentInformations("/conteneurs");
  const [viewState] = useState({
    latitude: 43.5,
    longitude: 5,
    zoom: 9.5,
    pitch: 50,
  });
  const history = useHistory();

  const [isLoaded, setLoaded] = useState(false);
  const [trafficRoutierData, setTrafficRoutierData] = useState(null);
  const [selectedTrafficYear, setSelectedTrafficYear] = useState("2018");
  const [selectedSensorType, setSelectedSensorType] = useState(null);
  const [sensorTypes, setSensorTypes] = useState(null);
  const [sensors, setSensors] = useState(null);
  const [hinterlands, setHinterlands] = useState([]);
  const [trajets, setTrajets] = useState(null);

  const [hinterlandDisplayed, setHinterlandDisplayed] = useState("ON");
  const [
    trafficRoutierDataDisplayed,
    setTrafficRoutierDataDisplayed,
  ] = useState("ON");
  const [sensorDisplayed, setSensorDisplayed] = useState("ON");
  const [trajetsDisplayed, setTrajetsDisplayed] = useState("ON");

  const getAndSetTrajets = async () => {
    const containers_trajets = await getTrajetsContainers();
    setTrajets(containers_trajets);
  };

  const getAndSetHinterlands = async () => {
    const hinterlands = await getHinterlands();
    setHinterlands(hinterlands);
  };

  const getAndSetSensors = async (sensorType) => {
    const containers_sensors = await getSensorsPosition(sensorType);
    setSensors(containers_sensors);
  };

  const getAndSetTrafficRoutierData = async (year = "2018") => {
    const traffic_routier_data = await getTrafficRoutierData(year);
    setTrafficRoutierData(traffic_routier_data);
  };

  const getAndSetSensorTypes = async () => {
    const sensor_types = await getSensorTypes();
    setSelectedSensorType(sensor_types[0]);
    setSensorTypes(sensor_types);
  };

  const init = async () => {
    await getAndSetSensorTypes();
    await getAndSetHinterlands();
    await getAndSetTrajets();
    setLoaded(true);
  };

  const handleRedirect = () => {
    history.push("/conteneurs/details");
  };

  useEffect(() => init(), []);

  useEffect(() => {
    selectedSensorType && getAndSetSensors(selectedSensorType);
  }, [selectedSensorType]);

  useEffect(() => {
    getAndSetTrafficRoutierData(selectedTrafficYear);
  }, [selectedTrafficYear]);

  return (
    <>
      <Container
        fluid
        className="p-0 position-relative d-flex flex-column justify-content-center align-items-center"
        style={{ zIndex: 0, minHeight: "100vh" }}
      >
        {trafficRoutierData && sensors && hinterlands && trajets && isLoaded ? (
          <>
            <MapContainer
              height={"100vh"}
              width={"100vw"}
              viewState={viewState}
              mapStyle="mapbox://styles/antoine-tech/ckkv8yq1v3vof17nzaeb0gmi7"
              trafficRoutierData={trafficRoutierData}
              sensors={sensors}
              hinterlands={hinterlands}
              hinterlandDisplayed={hinterlandDisplayed}
              trafficRoutierDataDisplayed={trafficRoutierDataDisplayed}
              sensorDisplayed={sensorDisplayed}
              trajets={trajets}
              trajetsDisplayed={trajetsDisplayed}
            />

            <PlusCircle
              style={{
                position: "fixed",
                height: "4rem",
                width: "4rem",
                bottom: "2rem",
                right: "8rem",
                cursor: "pointer",
              }}
              onClick={handleRedirect}
            />
          </>
        ) : (
          <>
            <Spinner animation="border" variant="secondary" />
            <p className="my-2">Chargement ...</p>
          </>
        )}
      </Container>

      <MapTrajetsFilters
        sensorTypes={sensorTypes}
        sensorDisplayed={sensorDisplayed}
        setSensorDisplayed={setSensorDisplayed}
        selectedTrafficYear={selectedTrafficYear}
        setSelectedTrafficYear={setSelectedTrafficYear}
        selectedSensorType={selectedSensorType}
        setSelectedSensorType={setSelectedSensorType}
        trafficRoutierDataDisplayed={trafficRoutierDataDisplayed}
        setTrafficRoutierDataDisplayed={setTrafficRoutierDataDisplayed}
        hinterlandDisplayed={hinterlandDisplayed}
        setHinterlandDisplayed={setHinterlandDisplayed}
        trajetsDisplayed={trajetsDisplayed}
        setTrajetsDisplayed={setTrajetsDisplayed}
      />
    </>
  );
};

export default TrajetsContainers;
