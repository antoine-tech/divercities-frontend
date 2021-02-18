import React, { useState, useEffect } from 'react';
import LocationIcon from '../icons/LocationIcon';
import BoatIcon from '../icons/BoatIcon';
import PieIcon from '../icons/PieIcon';
import { Row, Card } from 'react-bootstrap';
import './index.css';
import { getPortCount, getShipCount } from '../../API_CLIENT';

const MainIndicators = ({selectedRegion}) => {

    const [analytics, setAnalytics] = useState({
        portCount: null,
        shipCount: null,
        merchandiseValueSum: null,
    })

    const getAndSetAnalytics = async () => {
        const portCount = await getPortCount(selectedRegion)
        const shipCount = await getShipCount(selectedRegion)
        setAnalytics({ ...analytics, portCount: portCount[0].count, shipCount: shipCount.count })
    }

    useEffect(() => {
        getAndSetAnalytics();
    }, [selectedRegion])

    return (
        <Row className="w-100" id="main-indicators">
            <Card className="col-4">
                <LocationIcon fillColor="#FFF" height={36} width={36} />
                <h5 className="my-2">Ports</h5>
                <p className="font-weight-bold text-white display-4">{analytics.portCount}</p>
            </Card>

            <Card className="col-4" >
                <BoatIcon fillColor="#FFF" height={36} width={36} />
                <h5 className="my-2">Navires</h5>
                <p className="font-weight-bold text-white display-4">{analytics.shipCount}</p>
            </Card>
            <Card className="col-4">
                <PieIcon fillColor="#FFF" height={36} width={36} />
                <h5 className="my-2">Marchandises</h5>
                <p className="font-weight-bold text-white display-4">{analytics.merchandiseValueSum}</p>
            </Card>
        </Row>
    )
}

export default MainIndicators;