import React, { useState, useEffect, useMemo, useContext } from "react";
import { Container } from "react-bootstrap";
import {
  getContinents,
  getPorts,
  getHinterlands,
  getMarseilleToileIndustrialoPortuaire,
  getMarseilleRelatedPorts,
} from "../../../API_CLIENT";
import MapPorts from "../../../components/MapPorts/index";
import trajets_navire from "./json/formatted_trajets_navire.json";
import MapIndicator from "./MapIndicator";
import MapTrajetsFilters from "./MapTrajetsFIlter";
import currentInformationsContext from "../../../context/index";

const TrajetNavires = () => {
  const { setCurrentInformations } = useContext(currentInformationsContext);
  setCurrentInformations("/ports");
  const [continents, setContinents] = useState([]);
  const [ports, setPorts] = useState([]);
  const [marseilleRelatedPorts, setMarseilleRelatedPorts] = useState(null);
  const [hinterlands, setHinterlands] = useState([]);
  const [toileIndustrialoPortuaires, setToileIndustrialoPortuaires] = useState(
    []
  );
  const [displays] = useState(["ON", "OFF"]);
  const [mapPointsFilters, setMapPointsFilter] = useState({
    currentStartRegion: "ALL",
    currentEndRegion: "ALL",
    portsDisplayed: "ON",
    hinterlandsDisplayed: "ON",
    trajetsDisplayed: "ON",
    toileIndustrialoPortuairesDisplayed: "ON",
    selectedRegionRelation: "Europe",
  });

  const [viewState, setViewState] = useState({
    latitude: 43.3036447407697,
    longitude: 5.363113485806592,
    zoom: 2,
  });

  const getAndSetMarseilleRelatedPorts = async () => {
    const marseille_related_ports = await getMarseilleRelatedPorts();
    setMarseilleRelatedPorts(marseille_related_ports);
  };

  const getAndSetHinterlands = async () => {
    const hinterlands = await getHinterlands();
    setHinterlands(hinterlands);
  };

  const getAndSetToileIndustrialoPortuaire = async () => {
    const toile_industrialo_portuaire = await getMarseilleToileIndustrialoPortuaire();
    setToileIndustrialoPortuaires(toile_industrialo_portuaire);
  };

  const getAndSetPorts = async () => {
    const world_ports = await getPorts();
    setPorts(world_ports);
  };

  const getAndSetContinents = async () => {
    const world_continents = await getContinents();
    setContinents([...world_continents, "ALL"]);
  };

  const filtered_and_formatted_trajets = useMemo(() => {
    if (
      mapPointsFilters.currentEndRegion === "ALL" &&
      mapPointsFilters.currentStartRegion === "ALL"
    ) {
      return trajets_navire;
    } else {
      return trajets_navire.filter((e) => {
        if (
          mapPointsFilters.currentEndRegion === "ALL" &&
          mapPointsFilters.currentStartRegion !== "ALL"
        ) {
          return e.region === mapPointsFilters.currentStartRegion;
        } else if (
          mapPointsFilters.currentEndRegion !== "ALL" &&
          mapPointsFilters.currentStartRegion === "ALL"
        ) {
          return e.region === mapPointsFilters.currentEndRegion;
        } else {
          return (
            e.region === mapPointsFilters.currentEndRegion ||
            e.region === mapPointsFilters.currentStartRegion
          );
        }
      });
    }
  }, [mapPointsFilters]);

  useEffect(() => {
    getAndSetContinents();
    getAndSetPorts();
    getAndSetHinterlands();
    getAndSetToileIndustrialoPortuaire();
    getAndSetMarseilleRelatedPorts();
  }, [0]);

  const handleChangeViewState = ({ viewState }) => setViewState(viewState);

  const getMarseilleRelatedPortsCount = () => {
    if (marseilleRelatedPorts) {
      if (marseilleRelatedPorts[mapPointsFilters.selectedRegionRelation]) {
        return marseilleRelatedPorts[mapPointsFilters.selectedRegionRelation]
          .length;
      } else {
        let results = [];
        for (const key in marseilleRelatedPorts) {
          results = [...results, ...marseilleRelatedPorts[key]];
        }
        return results.length;
      }
    }
  };

  const marseilleRelatedPortsCount = getMarseilleRelatedPortsCount();

  return (
    <>
      <Container
        fluid
        className="p-0 position-relative justify-content-center align-items-center"
      >
        {filtered_and_formatted_trajets &&
          ports &&
          hinterlands &&
          marseilleRelatedPorts && (
            <MapPorts
              height={"100vh"}
              width={"100vw"}
              viewState={viewState}
              onViewStateChange={handleChangeViewState}
              mapStyle="mapbox://styles/antoine-tech/ckkv8yq1v3vof17nzaeb0gmi7"
              ports={ports}
              trajets={filtered_and_formatted_trajets}
              hinterlands={hinterlands}
              toileIndustrialoPortuaires={toileIndustrialoPortuaires}
              portsDisplayed={mapPointsFilters.portsDisplayed}
              hinterlandsDisplayed={mapPointsFilters.hinterlandsDisplayed}
              trajetsDisplayed={mapPointsFilters.trajetsDisplayed}
              toileIndustrialoPortuairesDisplayed={
                mapPointsFilters.toileIndustrialoPortuairesDisplayed
              }
              marseilleRelatedPorts={marseilleRelatedPorts}
              selectedRegionRelation={mapPointsFilters.selectedRegionRelation}
            />
          )}
      </Container>

      <MapTrajetsFilters
        mapPointsFilters={mapPointsFilters}
        setMapPointsFilter={setMapPointsFilter}
        continents={continents}
        displays={displays}
      />

      {ports && marseilleRelatedPorts && filtered_and_formatted_trajets && (
        <MapIndicator
          portCount={ports.length}
          marseilleRelatedPortsCount={marseilleRelatedPortsCount}
          navireCount={filtered_and_formatted_trajets.length}
        />
      )}
    </>
  );
};

export default TrajetNavires;
