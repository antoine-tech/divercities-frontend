import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo from "./logo.svg";
import MenuLeft from "../MenuLeft/index";

const AppNavbar = () => {
  const history = useHistory();

  const [isMenuToogled, setMenuToogled] = useState(false);

  const handleClickLink = (event, url) => {
    event.preventDefault();
    history.push(url);
  };

  const handleToogleMenu = (event) => {
    event.preventDefault();
    setMenuToogled(!isMenuToogled);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand
          onClick={handleToogleMenu}
          className="font-weight-bold d-flex align-items-center"
        >
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
            style={{ cursor: "pointer" }}
          />
          <Nav.Link
            className="font-weight-bold"
            onClick={(event) => handleClickLink(event, "/")}
          >
            DIVERCITIES
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              className="font-weight-bold"
              onClick={(event) => handleClickLink(event, "/conteneurs")}
            >
              SMART CONTENEUR
            </Nav.Link>
            <Nav.Link
              className="font-weight-bold"
              onClick={(event) => handleClickLink(event, "/ports")}
            >
              SMART PORT
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <MenuLeft setToogled={setMenuToogled} isToogled={isMenuToogled} />
    </>
  );
};

export default AppNavbar;
