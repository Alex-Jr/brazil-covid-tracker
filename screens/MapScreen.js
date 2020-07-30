import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

import { CustomPieChart } from "../components";
import { CovidService } from "../service";
import Colors from "../constants/Colors";
import CustomMap from "../constants/CustomMap";
import MapCoords from "../constants/MapCoords";

const brazilCoords = {
  latitude: -13,
  longitude: -52,
  latitudeDelta: 35,
  longitudeDelta: 37,
};

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const HomeScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isReloading, setReloading] = useState(false);
  const [mapInfo, setMapInfo] = useState([]);
  const [chartInfo, setChartInfo] = useState([]);

  const getRadius = (num) => {
    return (Math.log10(num / 1000) / Math.log10(1000)) * 100000;
  };

  const getOpacity = (index) => {
    return 0.2 + 0.02 * index;
  };

  useEffect(() => {
    if (!isReloading && !isLoading) return;
    statesInfo = CovidService.getStatesInfo().then((response) => {
      if('states' in response && 'regions' in response){
        setChartInfo(response.regions);
        setMapInfo(response.states);
      }
    });
    Promise.all([statesInfo]).then(() => {
      setLoading(false);
      setReloading(false);
    });
  }, [isReloading]);

  if (isLoading)
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size={"large"} color={Colors.textLight} />
      </View>
    );
  return (
    <View style={styles.screen}>
      {chartInfo.length > 0 && (
        <View style={styles.pieChartContainer}>
          <Text style={styles.pieChartTitle}> Casos Por Região</Text>
          <View style={styles.pieChartRow}>
            <View style={styles.pieChart}>
              <CustomPieChart data={chartInfo} />
            </View>

            <View style={styles.pieChartSubtitleContainer}>
              {chartInfo.map((value, index) => (
                <View style={styles.pieChartInfo} key={index.toString()}>
                  <Text style={styles.pieChartSubtitle}>{value.title}</Text>
                  <Text
                    style={{
                      ...styles.pieChartSubtitle,
                      ...{ color: value.color, marginLeft: 15 },
                    }}
                  >
                    {value.quantity}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
      {mapInfo.length > 0 && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={brazilCoords}
            customMapStyle={CustomMap}
            maxZoomLevel={10}
            minZoomLevel={3}
            rotateEnabled={false}
          >
            {mapInfo.map((region, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: -MapCoords[region.id].lat,
                    longitude: -MapCoords[region.id].long,
                  }}
                  title={region.nome}
                  description={`Casos:${region.totalCases.toString()}`}
                  tappable={true}
                  opacity={0}
                />
              );
            })}
            {mapInfo.map((region, index) => (
              <Circle
                key={index}
                center={{
                  latitude: -MapCoords[region.id].lat,
                  longitude: -MapCoords[region.id].long,
                }}
                radius={getRadius(region.totalCases.toString())}
                fillColor={`rgba(255,40,0,${getOpacity(index)})`}
                strokeColor={"rgba(255,40,0,0.4)"}
              />
            ))}
          </MapView>
        </View>
      )}
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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  mapContainer: {
    height: 375,
    width: "90%",
    maxHeight: "60%",
    borderRadius: 15,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  pieChartContainer: {
    width: "90%",
    height: 175,
    maxHeight: "30%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.sections,
  },
  pieChartTitle: {
    fontSize: 17,
    color: Colors.textLight,
  },
  pieChartRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  pieChart: {
    height: screenHeight < 500 ? 90 : 125,
    width: 125,
  },
  pieChartInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pieChartSubtitleContainer: {
    justifyContent: "center",
  },
  pieChartSubtitle: {
    fontSize: 13,
    color: Colors.textLight,
  },
});

export default HomeScreen;
