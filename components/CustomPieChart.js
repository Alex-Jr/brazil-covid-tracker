import React from "react";
import { PieChart } from "react-native-svg-charts";

import Colors  from "../constants/Colors"

const CustomPieChart = (props) => {
  data = props.data.map((value, index) => ({
    value: value.quantity,
    svg: {
      fill: value.color || Colors[value.title],
    },
    key: `pie-${index}`,
  }));
  return (
    <PieChart
      style={{flex: 1}}
      data={data}
      innerRadius={"75%"}
      sort={(a, b) => a.value - b.value}
    />
  );
};

export default CustomPieChart;
