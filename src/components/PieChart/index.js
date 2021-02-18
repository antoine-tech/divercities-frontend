import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import * as Icon from "react-bootstrap-icons";

const PieChart = ({ data, handleNodeClick, headerLabel, setData }) => {
  const [backArrowEnabled, setBackArrowEnabled] = useState(false);

  const handleArrowClick = () => {
    setData();
    setBackArrowEnabled(false);
  };
  const handleClick = (value) => {
    !backArrowEnabled && handleNodeClick(value);
  };
  return data ? (
    <div className="h-100 w-100">
      <div style={{ height: "90%", width: "100%" }}>
        {backArrowEnabled && (
          <Icon.ArrowLeft
            onClick={handleArrowClick}
            className="text-dark"
            style={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              fontSize: "4rem",
              cursor: "pointer",
              zIndex: 2000000
            }}
          />
        )}
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "category10" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#515151"
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#515151"
          enableSliceLabels={false}
          radialLabelsLinkStrokeWidth={8}
          onClick={(node) => {
            handleClick(node.id);
            setBackArrowEnabled(true);
          }}
        />
        <p className="text-center font-weight-bold my-2">{headerLabel}</p>
      </div>
    </div>
  ) : null;
};

export default PieChart;