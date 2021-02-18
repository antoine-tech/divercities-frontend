import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import TrajetsContainers from "./TrajetsContainers/index";
import ContainerDetails from "./ContainerDetails/index";
import "./index.css";

const Containers = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <TrajetsContainers />
      </Route>

      <Route exact path={`${path}/details`}>
        <ContainerDetails />
      </Route>
    </Switch>
  );
};

export default Containers;
