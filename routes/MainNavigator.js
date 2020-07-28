import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons"

import { HomeScreen, MapScreen, StatisticsScreen } from "../screens";
import Colors from "../constants/Colors";

const tabsNavigator = createBottomTabNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Informações",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="information" size={20} color={tintColor} />
        ),
      },
    },
    map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarLabel: "Mapa",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="google-maps" size={20} color={tintColor} />
        ),
      },
    },
    statistics: {
      screen: StatisticsScreen,
      navigationOptions: {
        tabBarLabel: "Estatísticas",
        tabBarIcon: ({ tintColor }) => (
          <Octicons name="graph" size={20} color={tintColor} />
        ),
      },
    },
  },
  { 
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: Colors.textLight,
      style:{
        backgroundColor: Colors.navBar
      }
    },
    tabBarPosition: "bottom",
  }
);

export default createAppContainer(tabsNavigator);
