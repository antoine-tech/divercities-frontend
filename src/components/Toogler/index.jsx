import React from 'react'


const Toogler = ({setToogled, isToogled}) => {
  return (
    <div
      id="toogler"
      onClick={() => setToogled(!isToogled)}
      style={{
        position: "fixed",
        border: ".25rem solid #E8E8E8",
        bottom: "50%",
        zIndex: 2147483640,
        left: "0rem",
        height: "4rem",
        width: "1rem",
        backgroundColor: "#282828",
        cursor: "pointer",
      }}
    ></div>
  );
};


export default Toogler