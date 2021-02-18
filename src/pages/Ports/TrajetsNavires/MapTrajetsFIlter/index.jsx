import React, { useState } from "react";
import { Col } from "react-bootstrap";
import FilterGroup from "../../../../components/FilterGroup";

const MapTrajetsFilters = ({
  mapPointsFilters,
  setMapPointsFilter,
  continents,
  displays,
}) => {
  const styles = {
    position: "fixed",
    zIndex: 1000000,
    left: 0,
    height: "100vh",
    bottom: 0,
    overflowY: "auto",
    overflowX: "hidden",
    transition: "transform .5s ease-in-out",
  };
  const [isToogled, setToogled] = useState(true);
  return (
    <>
      <Col
        xs={12}
        md={6}
        lg={3}
        className="bg-light d-block p-4"
        style={
          isToogled
            ? { ...styles, transform: "translateX(0)" }
            : { ...styles, transform: "translateX(-100vw)" }
        }
      >
        <FilterGroup
          selectedItem={mapPointsFilters.currentStartRegion}
          setSelectedItem={(value) =>
            setMapPointsFilter({
              ...mapPointsFilters,
              currentStartRegion: value,
            })
          }
          headerTop={true}
          items={continents}
          filterHeader={"CONTINENT DU PORT PRECEDENT L'ESCALE A MARSEILLE"}
        />

        <FilterGroup
          selectedItem={mapPointsFilters.currentEndRegion}
          setSelectedItem={(value) =>
            setMapPointsFilter({ ...mapPointsFilters, currentEndRegion: value })
          }
          headerTop={true}
          items={continents}
          filterHeader={"CONTINENT DU PORT SUIVANT L'ESCALE A MARSEILLE"}
        />

        <FilterGroup
          selectedItem={mapPointsFilters.selectedRegionRelation}
          setSelectedItem={(value) =>
            setMapPointsFilter({ ...mapPointsFilters, selectedRegionRelation: value })
          }
          headerTop={true}
          items={continents}
          filterHeader={"CONTINENT DES PORTS EN RELATION AVEC MARSEILLE"}
        />

        <FilterGroup
          selectedItem={mapPointsFilters.portsDisplayed}
          setSelectedItem={(value) =>
            setMapPointsFilter({
              ...mapPointsFilters,
              portsDisplayed: value,
            })
          }
          headerTop={true}
          items={displays}
          filterHeader={"AFFICHER LES PORTS"}
        />

        <FilterGroup
          selectedItem={mapPointsFilters.hinterlandsDisplayed}
          setSelectedItem={(value) =>
            setMapPointsFilter({
              ...mapPointsFilters,
              hinterlandsDisplayed: value,
            })
          }
          headerTop={true}
          items={displays}
          filterHeader={"AFFICHER LES HINTERLANDS"}
        />

        <FilterGroup
          selectedItem={mapPointsFilters.toileIndustrialoPortuairesDisplayed}
          setSelectedItem={(value) =>
            setMapPointsFilter({
              ...mapPointsFilters,
              toileIndustrialoPortuairesDisplayed: value,
            })
          }
          headerTop={true}
          items={displays}
          filterHeader={"AFFICHER LA TOILE INDUSTRIALO PORTUAIRE"}
        />

        <FilterGroup
          selectedItem={mapPointsFilters.trajetsDisplayed}
          setSelectedItem={(value) =>
            setMapPointsFilter({
              ...mapPointsFilters,
              trajetsDisplayed: value,
            })
          }
          headerTop={true}
          items={displays}
          filterHeader={"AFFICHER LES TRAJETS"}
        />
      </Col>
      <div
        id="toogler"
        onClick={() => setToogled(!isToogled)}
        style={{
          position: "absolute",
          border: ".25rem solid #E8E8E8",
          bottom: "50%",
          zIndex: 2000000,
          left: "0rem",
          height: "4rem",
          width: "1rem",
          backgroundColor: "#282828",
          cursor: "pointer",
        }}
      ></div>
    </>
  );
};

export default MapTrajetsFilters;
