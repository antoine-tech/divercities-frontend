import React from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";

const Sunburst = ({ data, headerLabel }) => {
  return (
    <div className="h-100 w-100">
      <div style={{ height: "90%", width: "100%" }}>
        <ResponsiveSunburst
          data={data}
          margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
          id="name"
          value="loc"
          cornerRadius={2}
          borderWidth={1}
          borderColor="#515151"
          colors={{ scheme: "category10" }}
          childColor={{ from: "color" }}
          animate={false}
          motionConfig="gentle"
          isInteractive={true}
        />

        <p className="text-center font-weight-bold my-2">{headerLabel}</p>
      </div>
    </div>
  );
};

export default Sunburst;
