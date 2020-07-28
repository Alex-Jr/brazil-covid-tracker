import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import MainNavigator from "./routes/MainNavigator";

import { MaterialCommunityIcons } from "@expo/vector-icons"

const loadIcons = async () => {
  const icones = {
    ...MaterialCommunityIcons.font,
  };

  return await Font.loadAsync(icones)
    .then(() => {
      return Promise.resolve("Icones carregados com sucesso");
    })
    .catch(() => {
      return Promise.reject("Falha ao carregar os Icones");
    });
};

export default function App() {
  const [appLoading, setAppLoading] = useState(true);

  if (appLoading) {
    return (
      <AppLoading
        startAsync={loadIcons}
        onFinish={() => setAppLoading(false)}
        onError={console.warn}
      />
    );
  }
  return <MainNavigator />;
}
