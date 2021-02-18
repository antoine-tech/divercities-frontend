import React, { useState, useEffect, useContext } from "react";
import { Tab } from "react-bootstrap";
import {
  getPortsRelations,
  getPortsExportations,
  getPortsImportations,
  getMarseilleGoods,
  getMarseilleGoodsMonthlyEvolution,
} from "../../../API_CLIENT/index.js";
import NavMenu from "./NavMenu/index";
import TabsGroup from "./TabsGroup/index";
import currentInformationsContext from "../../../context/index";
import "./index.css";

const GoodsExchange = () => {
  const { setCurrentInformations } = useContext(currentInformationsContext);

  const handleChangeChatBoxInformations = (selectedKey) => {
    const mapTabsToInfoKey = {
      zero: "ports/merchandises/relations",
      first: "ports/merchandises/importations",
      second: "ports/merchandises/exportations",
      third: "ports/merchandises/goods/in",
      fourth: "ports/merchandises/goods/out",
      fifth: "ports/merchandises/evolution/goods-in-out",
    };

    setCurrentInformations(mapTabsToInfoKey[selectedKey]);
  };

  const [portsRelations, setPortsRelations] = useState();
  const [portsExportations, setPortsExportations] = useState([]);
  const [portsImportations, setPortsImportations] = useState([]);
  const [
    selectedPieUnityImportations,
    setSelectedPieUnityImportations,
  ] = useState("values");
  const [
    selectedPieUnityExportations,
    setSelectedPieUnityExportations,
  ] = useState("values");
  const [
    selectedCountryImportations,
    setSelectedCountryImportations,
  ] = useState(null);
  const [
    selectedCountryExportations,
    setSelectedCountryExportations,
  ] = useState(null);
  const [marseilleGoodsOut, setMarseilleGoodsOut] = useState(null);
  const [marseilleGoodsIn, setMarseilleGoodsIn] = useState(null);
  const [
    marseilleGoodsEvolutionData,
    setMarseilleGoodsEvolutionData,
  ] = useState(null);
  const [selectedGoodsEvolutionType, setSelectedGoodsEvolutionType] = useState(
    "in"
  );

  const getAndSetPortsExportations = async (country, pieUnity = "values") => {
    const ports_exportations = await getPortsExportations(country, pieUnity);
    setPortsExportations(ports_exportations);
  };
  const getAndSetPortsImportations = async (country, pieUnity = "values") => {
    const ports_importations = await getPortsImportations(country, pieUnity);
    setPortsImportations(ports_importations);
  };

  const getAndSetPortsRelations = async () => {
    const ports_relations = await getPortsRelations();
    setPortsRelations(ports_relations);
  };
  const getAndSetMarseilleGoods = async (type = "in") => {
    const marseille_goods = await getMarseilleGoods(type);
    type == "in"
      ? setMarseilleGoodsIn(marseille_goods)
      : setMarseilleGoodsOut(marseille_goods);
  };
  const getAndSetMarseilleGoodsMonthlyEvolution = async (type = "in") => {
    const marseille_goods_evolution_data = await getMarseilleGoodsMonthlyEvolution(
      type
    );
    setMarseilleGoodsEvolutionData(marseille_goods_evolution_data);
  };
  const handleNodeClickExportations = async (country) => {
    console.log(country);
    setSelectedCountryExportations(country);
  };

  const handleNodeClickImportations = async (country) => {
    setSelectedCountryImportations(country);
  };

  useEffect(() => {
    getAndSetPortsImportations(
      selectedCountryImportations,
      selectedPieUnityImportations
    );
  }, [selectedCountryImportations, selectedPieUnityImportations]);
  useEffect(() => {
    getAndSetPortsExportations(
      selectedCountryExportations,
      selectedPieUnityExportations
    );
  }, [selectedPieUnityExportations, selectedCountryExportations]);
  useEffect(() => {
    getAndSetMarseilleGoodsMonthlyEvolution(selectedGoodsEvolutionType);
  }, [selectedGoodsEvolutionType]);
  useEffect(() => {
    getAndSetPortsRelations();
    getAndSetMarseilleGoods("in");
    getAndSetMarseilleGoods("out");
    getAndSetMarseilleGoodsMonthlyEvolution("in");
    handleChangeChatBoxInformations('zero')
  }, [0]);

  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey="zero"
      className="bg-light p-0"
      onSelect={handleChangeChatBoxInformations}
    >
      <NavMenu />
      <TabsGroup
        portsRelations={portsRelations}
        portsExportations={portsExportations}
        portsImportations={portsImportations}
        setSelectedPieUnityExportations={setSelectedPieUnityExportations}
        selectedPieUnityExportations={selectedPieUnityExportations}
        setSelectedPieUnityImportations={setSelectedPieUnityImportations}
        selectedPieUnityImportations={selectedPieUnityImportations}
        marseilleGoodsIn={marseilleGoodsIn}
        marseilleGoodsOut={marseilleGoodsOut}
        setSelectedGoodsEvolutionType={setSelectedGoodsEvolutionType}
        selectedGoodsEvolutionType={selectedGoodsEvolutionType}
        marseilleGoodsEvolutionData={marseilleGoodsEvolutionData}
        handleNodeClickExportations={handleNodeClickExportations}
        handleNodeClickImportations={handleNodeClickImportations}
        getAndSetPortsImportations={getAndSetPortsImportations}
        getAndSetPortsExportations={getAndSetPortsExportations}
      />
    </Tab.Container>
  );
};

export default GoodsExchange;
