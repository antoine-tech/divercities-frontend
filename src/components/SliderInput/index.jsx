import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./index.css";


const SliderInput = ({
  onChange,
  marks,
  defaultValue,
  min,
  max
}) => {
  return (
      <Slider
        min={min}
        max={max}
        defaultValue={defaultValue}
        marks={marks}
        step={null}
        onChange={(value) => onChange(value)}
      />
  );
};

export default SliderInput;
