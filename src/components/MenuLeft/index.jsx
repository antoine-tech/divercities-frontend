import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import { X } from "react-bootstrap-icons";

const MenuLeft = ({ isToogled, setToogled }) => {
  const history = useHistory();

  const handleClick = (url) => history.push(url);

  return (
    <nav id="menu-left" className={isToogled ? "active" : ""}>
      <X
        onClick={() => setToogled(!isToogled)}
        style={{
          top: "1rem",
          left: "1rem",
          position: "fixed",
          zIndex: 100000,
          color: "#000",
          height: "2.5rem",
          width: "2.5rem",
          cursor: "pointer",
        }}
      />
      <ul className="menu-list">
        <li
          className="font-weight-bold"
          style={{ fontSize: "2rem" }}
          onClick={() => handleClick("/ports")}
        >
          SMARTPORT
        </li>
        <li
          className="menu-list-item rounded"
          onClick={() => handleClick("/ports")}
        >
          Les ports de Marseille et leur place dans le Monde
        </li>
        <li
          className="menu-list-item rounded"
          onClick={() => handleClick("/ports/merchandises")}
        >
          Les échanges de marchandises entre Marseille et le monde
        </li>
        <li
          className="menu-list-item rounded"
          onClick={() => handleClick("/ports/passengers")}
        >
          Le transport de passager{" "}
        </li>
        <li
          className="menu-list-item rounded"
          onClick={() => handleClick("/ports/arrivals")}
        >
          Les navires et leur temps de retard{" "}
        </li>
        <li
          className="menu-list-item rounded"
          onClick={() => handleClick("/ports/forecast")}
        >
          Prédire le temps de retard par l’analyse des données météorologique
        </li>
      </ul>
    </nav>
  );
};

export default MenuLeft;
