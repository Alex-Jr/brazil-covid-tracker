import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const CustomLineChart = (props) => {

  const chartConfig = {
    backgroundGradientFrom: props.backgroundColor,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: props.backgroundColor,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, 
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  const data = {
    labels: props.label,
    datasets: [
      {
        data: props.data,
        color: () => props.color,
        strokeWidth: 2,
      }
    ],
  }
  return (
    <LineChart
      data={data}
      width={Math.round(Dimensions.get('window').width - 20)}
      height={300}
      chartConfig={chartConfig}
      formatYLabel={(label) => {
        if(props.format == "float" ){
          return label
        } else {
          return label.slice(0, label.length - 3)
        }
       }
      }
    />
  );
};

export default CustomLineChart;
