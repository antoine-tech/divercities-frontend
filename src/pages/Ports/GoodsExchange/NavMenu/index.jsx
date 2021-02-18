import React, { useState } from "react";
import { Nav, Col,} from "react-bootstrap";
import Toogler from "../../../../components/Toogler/index";

const styles = {
  position: "absolute",
  zIndex: 2000000000,
  left: 0,
  height: "100vh",
  bottom: 0,
  overflowY: "auto",
  overflowX: "hidden",
  transition: "transform .5s ease-in-out",
};

const NavMenu = () => {
  const [isToogled, setToogled] = useState(true);
  return (
    <>
      <Col
        className="bg-light"
        xs={12}
        md={6}
        xl={3}
        style={
          isToogled
            ? { ...styles, transform: "translateX(0)" }
            : { ...styles, transform: "translateX(-100vw)" }
        }
      >
        <Nav variant="pills" className="flex-column p-2">
          <Nav.Item>
            <Nav.Link eventKey="zero">
              Relations entre Marseille et le monde
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="first">Importations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Exportations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">Entrées de marchandises</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="fourth">Sorties de marchandises</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="fifth">
              Evolutions entrée sorties de marchandises
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Toogler setToogled={setToogled} isToogled={isToogled} />
    </>
  );
};

export default NavMenu;
