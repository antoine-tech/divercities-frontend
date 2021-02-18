import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';

const MapIndicator = ({
    portCount,
    marseilleRelatedPortsCount,
    navireCount
}) =>
{
    return  (
        <Row style={{ position: "absolute", top: "6rem", right: "2rem" }}>
          <Col>
            <Badge variant="dark" className="my-2 p-4 badge-pill" style={{ fontSize: "1rem" }}>
              Ports total {portCount}
            </Badge>
          </Col>
          <Col>
        
            <Badge variant="dark" className="my-2 p-4 badge-pill" style={{ fontSize: "1rem" }}>
              Port en relation {marseilleRelatedPortsCount}
            </Badge>
          </Col>
          <Col>
            <Badge variant="dark" className="my-2 p-4 badge-pill" style={{ fontSize: "1rem" }}>
              Navires {navireCount}
            </Badge>
          </Col>
        </Row>
    )
}

export default MapIndicator;