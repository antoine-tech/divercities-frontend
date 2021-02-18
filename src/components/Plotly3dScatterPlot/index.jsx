import React from "react";
import Plot from "react-plotly.js";

const Plotly3dScatterPlot = ({ data, magnitude }) => {
  return (
    <Plot
      data={data}
      layout={{
        height: "100%",
        width: "100%",
        title: `Vecteur du choc de magnitude maximale ${magnitude}`,
      }}
      onRelayout={(figure) => console.log(figure)}
    />
  );
};

export default Plotly3dScatterPlot;
