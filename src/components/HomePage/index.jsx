import React from "react";
import "./index.css";
import { Container } from "react-bootstrap";
import BoatIcon from "../icons/BoatIcon/index";

const HomePage = () => {
  return (
    <Container
      fluid
      className="p-0 d-flex flex-column align-items-center justify-content-center w-80"
      style={{ position: "relative", top: 0, bottom: 0, minHeight: "100vh" }}
    >
      <section id="one">
        <h1  className="text-black font-lg">
          DIVERCITIES
        </h1>
        <BoatIcon fillColor="#000" />
        <h1 className="text-black font-lg" >
          MARSEILLE
        </h1>
      </section>
      <section id="two"></section>
      <div id="three">
        <h1  className="text-white">
          DIVERCITIES
        </h1>
        <BoatIcon id="boatIcon" fillColor="#FFF" />
        <h1 className="text-white font-lg" >
          MARSEILLE
        </h1>
      </div>
    </Container>
  );
};

export default HomePage;
