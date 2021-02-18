import React, { useState, useEffect, useContext } from "react";
import { Tab, Col } from "react-bootstrap";
import FilterGroup from "../../../components/FilterGroup/index";
import LineChart from "../../../components/LineChart";
import Sunburst from "../../../components/Sunburst";
import {
  getMarseillePassengers,
  getMarseillePassengersMonthlyEvolution,
} from "../../../API_CLIENT";
import "./index.css";
import NavMenu from "../Passengers/NavMenu";
import currentInformationsContext from "../../../context";

const Passengers = () => {
  const { setCurrentInformations } = useContext(currentInformationsContext);

  const handleChangeChatBoxInformations = (selectedKey) => {
    const mapTabsToInfoKey = {
      zero: "/ports/passengers/in",
      first: "/ports/passengers/out",
      second: "/ports/passengers/evolution",
    };

    setCurrentInformations(mapTabsToInfoKey[selectedKey]);
  };
  const [marseillePassengersIn, setMarseillePassengersIn] = useState(null);
  const [marseillePassengersOut, setMarseillePassengersOut] = useState(null);
  const [
    marseillePassengersEvolutionData,
    setMarseillePassengersEvolutionData,
  ] = useState(null);
  const [
    selectedPassengerEvolutionType,
    setSelectedPassengerEvolutionType,
  ] = useState("in");

  const getAndSetMarseillePassengers = async () => {
    const marseille_passengers_in = await getMarseillePassengers("in");
    setMarseillePassengersIn(marseille_passengers_in);
    const marseille_passengers_out = await getMarseillePassengers("out");
    setMarseillePassengersOut(marseille_passengers_out);
  };

  const getAndSetMarseillePassengersEvolutionData = async () => {
    const marseille_passengers_evolution_data = await getMarseillePassengersMonthlyEvolution(
      selectedPassengerEvolutionType
    );
    setMarseillePassengersEvolutionData(marseille_passengers_evolution_data);
  };

  useEffect(() => {
    getAndSetMarseillePassengers();
    handleChangeChatBoxInformations('zero')
  }, []);

  useEffect(() => {
    getAndSetMarseillePassengersEvolutionData();
  }, [selectedPassengerEvolutionType]);

  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey="zero"
      className="bg-light p-0"
      onSelect={handleChangeChatBoxInformations}
    >
      <NavMenu />
      <Col sm={12} className="h-100 w-100">
        <Tab.Content
          className="h-100 w-100"
          style={{ position: "relative", top: "0" }}
        >
          <Tab.Pane eventKey="zero" className="h-100 w-100">
            <Col
              xs={12}
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "95vh" }}
            >
              {marseillePassengersIn && (
                <div style={{ height: "40rem", width: "100%" }}>
                  <Sunburst
                    headerLabel="Repartition entrées de passagers GPMM 2019"
                    data={marseillePassengersIn}
                  />
                </div>
              )}
            </Col>
          </Tab.Pane>

          <Tab.Pane
            eventKey="first"
            className="h-100 w-100"
            style={{ position: "relative", top: "0" }}
          >
            <Col
              xs={12}
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "95vh" }}
            >
              {marseillePassengersOut && (
                <div style={{ height: "40rem", width: "100%" }}>
                  <Sunburst
                    headerLabel="Repartition sorties de passagers GPMM 2019"
                    data={marseillePassengersOut}
                  />
                </div>
              )}
            </Col>
          </Tab.Pane>
          <Tab.Pane
            eventKey="second"
            className="h-100 w-100"
            style={{ position: "relative", top: "0" }}
          >
            <Col
              xs={12}
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "95vh" }}
            >
              {marseillePassengersEvolutionData && (
                <div style={{ height: "40rem", width: "100%" }}>
                  <LineChart
                    headerLabel="Evolution entrées-sorties de Passagers GPMM 2019"
                    data={marseillePassengersEvolutionData}
                  />
                </div>
              )}

              <FilterGroup
                setSelectedItem={setSelectedPassengerEvolutionType}
                selectedItem={selectedPassengerEvolutionType}
                items={["in", "out"]}
              />
            </Col>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Tab.Container>
  );
};

export default Passengers;
