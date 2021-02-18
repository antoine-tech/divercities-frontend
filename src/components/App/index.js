import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ports from "../../pages/Ports";
import AppNavbar from "../AppNavar";
import HomePage from "../HomePage/index";
import Containers from "../../pages/Containers/index";
import ChatBox from "../ChatBox/index";
import currentInformationsContext from "../../context/index";
import informations from '../../assets/informations/informations.json'

const App = () => {
  const [currentInformations, setCurrentInformations] = useState("/");
  return (
    <currentInformationsContext.Provider
      value={{ currentInformations, setCurrentInformations, informations }}
    >
      <Container fluid className="bg-light p-0" style={{ minHeight: "100vh" }}>
        <Router>
          <AppNavbar />
          <ChatBox />
          <Switch>
            <Route exact path={"/"}>
              <HomePage />
            </Route>
            <Route path={"/ports"}>
              <Ports />
            </Route>
            <Route path={"/conteneurs"}>
              <Containers />
            </Route>
          </Switch>
        </Router>
      </Container>
    </currentInformationsContext.Provider>
  );
};

export default App;
