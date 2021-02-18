import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { getNaviresData } from "../../../API_CLIENT/index.js";
import BarChart from "../../../components/BarChart/index";
import currentInformationsContext from '../../../context/index';

const Arrivals = () => {
  const { setCurrentInformations } = useContext(currentInformationsContext);
  setCurrentInformations("/ports/arrivals")
  const [naviresDataArrival, setNavireDataArrival] = useState(null);
  const [naviresDataDeparture, setNavireDataDeparture] = useState(null);

  const getAndSetNaviresData = async () => {
    const navires_data = await getNaviresData();
    const navire_retard_arrival_keys = Object.keys(
      navires_data.retard_arrival.plot
    );
    const navire_retard_departure_keys = Object.keys(
      navires_data.retard_departure.plot
    );
    const formatted_data_arrival = navire_retard_arrival_keys.map((e) => {
      return {
        range: e,
        retard: navires_data.retard_arrival.plot[e],
      };
    });
    const formatted_data_departure = navire_retard_departure_keys.map((e) => {
      return {
        range: e,
        retard: navires_data.retard_departure.plot[e],
      };
    });
    setNavireDataDeparture(formatted_data_departure);
    setNavireDataArrival(formatted_data_arrival);
  };

  useEffect(() => {
    getAndSetNaviresData();
  }, [0]);

  return (
    <>
      <Row style={{ width: "100%", height: "95vh" }}>
        <Col xs={12} lg={6} className="p-4">
          <div style={{ width: "100%", height: "80%" }}>
            {naviresDataDeparture && <BarChart data={naviresDataDeparture} />}
          </div>
          <p className="font-weight-bold text-center w-100">
            Temps de retard à l&apos;arrivée
          </p>
        </Col>
        <Col xs={12} lg={6} className="p-4">
          <div style={{ width: "100%", height: "80%" }}>
            {naviresDataArrival && <BarChart data={naviresDataArrival} />}
          </div>
          <p className="font-weight-bold text-center w-100">Temps de retard au départ</p>
        </Col>
      </Row>
    </>
  );
};

export default Arrivals;
