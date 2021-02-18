import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import './index.css';
import TrajetNavires from './TrajetsNavires/index';
import GoodsExchange from './GoodsExchange/index';
import Passengers from './Passengers/index';
import Arrivals from './Arrivals/index';
import Forecast from './Forecast/index';

const Ports = () => {

    const { path } = useRouteMatch();

    return (

        <Switch>
            <Route exact path={path}>
                <TrajetNavires />
            </Route>
            <Route exact path={`${path}/merchandises`}>
                <GoodsExchange />
            </Route>
            <Route exact path={`${path}/passengers`}>
                <Passengers/>
            </Route>
            <Route exact path={`${path}/arrivals`}>
                <Arrivals/>
            </Route>
            <Route exact path={`${path}/forecast`}>
                <Forecast/>
            </Route>
        </Switch>
    )
}

export default Ports;