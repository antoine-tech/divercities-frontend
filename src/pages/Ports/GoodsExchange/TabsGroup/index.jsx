import React from "react";
import { Col, Tab, Spinner } from "react-bootstrap";
import PieChart from "../../../../components/PieChart/index";
import SankeyPorts from "../../../../components/SankeyPorts/index";
import FilterGroup from "../../../../components/FilterGroup/index";
import Sunburst from "../../../../components/Sunburst/index";
import LineChart from "../../../../components/LineChart/index";

const TabsGroup = ({
  portsRelations,
  portsExportations,
  portsImportations,
  setSelectedPieUnityExportations,
  selectedPieUnityExportations,
  setSelectedPieUnityImportations,
  selectedPieUnityImportations,
  marseilleGoodsIn,
  marseilleGoodsOut,
  setSelectedGoodsEvolutionType,
  selectedGoodsEvolutionType,
  marseilleGoodsEvolutionData,
  handleNodeClickExportations,
  handleNodeClickImportations,
  getAndSetPortsImportations,
  getAndSetPortsExportations,
}) => {
  return (
    <Col
      xs={12}
      style={{
        minHeight: "100vh",
        width: "100vw",
        marginTop: "3rem",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Tab.Content className="h-100 w-100">
        <Tab.Pane
          eventKey="zero"
          className="w-100"
          style={{ position: "relative", top: "0" }}
        >
          <Col
            xs={12}
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "95vh" }}
          >
            {portsRelations ? (
              <div
                style={{
                  height: "80vh",
                  width: "100%",
                  position: "relative",
                  zIndex: 10000000,
                }}
              >
                <SankeyPorts
                  data={portsRelations}
                  headerLabel="Relations entre le port de marseille et le monde"
                />
              </div>
            ) : (
              <>
                <Spinner animation="border" variant="secondary" />
                <p className="my-2">Chargement ...</p>
              </>
            )}
          </Col>
        </Tab.Pane>

        <Tab.Pane
          eventKey="first"
          className="w-100"
          style={{ position: "relative", top: "0" }}
        >
          <Col
            xs={12}
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "95vh" }}
          >
            {portsExportations && (
              <div style={{ height: "80vh", width: "100%" }}>
                <PieChart
                  headerLabel="Importations Port de Marseille 2019"
                  setData={() =>
                    getAndSetPortsImportations(
                      null,
                      selectedPieUnityImportations
                    )
                  }
                  data={portsImportations}
                  handleNodeClick={(value) =>
                    handleNodeClickImportations(value)
                  }
                />
              </div>
            )}
            <FilterGroup
              setSelectedItem={setSelectedPieUnityImportations}
              selectedItem={selectedPieUnityImportations}
              items={["values", "masses"]}
            />
          </Col>
        </Tab.Pane>
        <Tab.Pane
          eventKey="second"
          className="w-100"
          style={{ position: "relative", top: "0" }}
        >
          <Col
            xs={12}
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "95vh" }}
          >
            {portsImportations && (
              <div style={{ height: "80vh", width: "100%" }}>
                <PieChart
                  headerLabel="Exportations Port de Marseille 2019"
                  setData={() =>
                    getAndSetPortsExportations(
                      null,
                      selectedPieUnityExportations
                    )
                  }
                  data={portsExportations}
                  handleNodeClick={(value) =>
                    handleNodeClickExportations(value)
                  }
                />
              </div>
            )}
            <FilterGroup
              setSelectedItem={setSelectedPieUnityExportations}
              selectedItem={selectedPieUnityExportations}
              items={["values", "masses"]}
            />
          </Col>
        </Tab.Pane>

        <Tab.Pane
          eventKey="third"
          className="w-100"
          style={{ position: "relative", top: "0" }}
        >
          <Col
            xs={12}
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "95vh" }}
          >
            {marseilleGoodsIn && (
              <div style={{ height: "80vh", width: "100%" }}>
                <Sunburst
                  headerLabel="Entrées Port de Marseille 2019"
                  data={marseilleGoodsIn}
                />
              </div>
            )}
          </Col>
        </Tab.Pane>

        <Tab.Pane
          eventKey="fourth"
          className="w-100"
          style={{ position: "relative", top: "0" }}
        >
          <Col
            xs={12}
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "95vh" }}
          >
            {marseilleGoodsOut && (
              <div style={{ height: "80vh", width: "100%" }}>
                <Sunburst
                  headerLabel="Sorties Port de Marseille 2019"
                  data={marseilleGoodsOut}
                />
              </div>
            )}
          </Col>
        </Tab.Pane>
        <Tab.Pane
          eventKey="fifth"
          className="w-100"
          style={{ position: "relative", top: "0" }}
        >
          <Col
            xs={12}
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "95vh" }}
          >
            {marseilleGoodsEvolutionData && (
              <div style={{ height: "80vh", width: "100%" }}>
                <LineChart
                  headerLabel="Evolution entrées-sorties Port de Marseille 2019"
                  data={marseilleGoodsEvolutionData}
                />
              </div>
            )}

            <FilterGroup
              setSelectedItem={setSelectedGoodsEvolutionType}
              selectedItem={selectedGoodsEvolutionType}
              items={["in", "out"]}
            />
          </Col>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  );
};

export default TabsGroup;
