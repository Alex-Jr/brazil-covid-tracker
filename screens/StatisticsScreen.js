import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ActivityIndicator, StatusBar } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import StatesList from "../constants/StatesList";
import { CovidService } from "../service";
import { CustomLineChart } from "../components/";

const HomeScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isReloading, setReloading] = useState(false);
  const [chartData, setChartdata] = useState({});
  const [state, setState] = useState("BR");
  const [limit, setLimit] = useState(7);
  const [type, setType] = useState("totalCases");

  useEffect(() => {
    if (!isLoading && !isReloading) return;
    const chart = CovidService.getRegionalStatistics(state, limit);
    Promise.all([chart]).then((value) => {
      setLoading(false);
      setReloading(false);
      setChartdata(value[0]);
    });
  }, [isLoading, isReloading]);

  const renderChart = useCallback(() => {
    if (isLoading || isReloading) return;

    let data = [];
    let label = [];
    for (const [key, value] of Object.entries(chartData)) {
      label.push(`${key.slice(8, 10)}`);
      data.push(parseFloat(value[type]));
    }
    if(type == "deaths_by_totalCases") {
      data = data.map((v) => v*100)
    }
    if(limit == 30) {
      data = data.filter((v, i) => i % 3 == 0)
      label = label.filter((v, i) => i % 3 == 0)
    }
    return (
      <View style={{ marginLeft: 10 }}>
        <CustomLineChart
          data={data}
          label={label}
          format={type == "deaths_by_totalCases" ? "float" : "integer"}
          color={"rgba(134, 65, 244, 1)"}
          backgroundColor={"#08130D"}
        />
      </View>
    );
  }, [chartData, type]);

  if (isLoading || isReloading)
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size={"large"} color={Colors.textLight} />
      </View>
    );
  return (
    <View style={styles.screen}>
      <RNPickerSelect
        style={{marginTop: 5}}
        onValueChange={(value) => {
          setState(value);
          setReloading(true);
        }}
        value={state}
        placeholder={{ label: "Brasil", value: "BR" }}
        items={StatesList.map((state) => {
          return { label: state.name, value: state.uf };
        })}
        Icon={() => {
          return (
            <MaterialCommunityIcons
              name={"chevron-down"}
              size={20}
              color={"white"}
              style={{ marginRight: 15, marginTop: 15 }}
            />
          );
        }}
      />
      <RNPickerSelect
        style={{marginTop: 5}}
        onValueChange={(value) => {
          setLimit(value);
          setReloading(true);
        }}
        value={limit}
        placeholder={{ label: "Ultima semana", value: 7 }}
        items={[{ label: "Ultima mês", value: 30 }]}
        Icon={() => {
          return (
            <MaterialCommunityIcons
              name={"chevron-down"}
              size={20}
              color={"white"}
              style={{ marginRight: 15, marginTop: 15 }}
            />
          );
        }}
      />
      <RNPickerSelect
        style={{marginTop: 5}}
        onValueChange={(value) => {
          setType(value);
        }}
        value={type}
        placeholder={{ label: "Casos Totais", value: "totalCases" }}
        items={[
          { label: "N° de óbitos", value: "totalDeaths" },
          { label: "Casos recuperados", value: "recovered" },
          { label: "Novos Casos", value: "newCases" },
          { label: "Casos suspeitos", value: "suspects" },
          { label: "Letalidade", value: "deaths_by_totalCases" },
        ]}
        Icon={() => {
          return (
            <MaterialCommunityIcons
              name={"chevron-down"}
              size={20}
              color={"white"}
              style={{ marginRight: 15, marginTop: 15 }}
            />
          );
        }}
      />

      {renderChart()}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: Colors.background,
  },
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  }
});

export default HomeScreen;
