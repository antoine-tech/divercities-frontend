import React from "react";
import { ResponsiveSankey } from "@nivo/sankey";

const SankeyPorts = ({ data, headerLabel }) => {
  return (
    <div className="h-100 w-100">
      <div style={{ height: "90%", width: "100%" }}>
        <ResponsiveSankey
          data={data}
          margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
          align="justify"
          colors={{ scheme: "nivo" }}
          nodeOpacity={1}
          nodeThickness={8}
          nodeInnerPadding={0}
          nodeSpacing={0}
          nodeBorderWidth={1}
          nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          enableLabels={false}
          enableLinkGradient={true}
        />
        <p className="text-center font-weight-bold my-2">
          {headerLabel}
        </p>
      </div>
    </div>
  );
};

export default SankeyPorts;
