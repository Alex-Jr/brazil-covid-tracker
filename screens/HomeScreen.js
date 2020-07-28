import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  Dimensions
} from "react-native";
import { Linking } from "expo";

import { NewsService, CovidService } from "../service";

import { ArticleItem, NumberGrid, CustomPieChart } from "../components";
import Colors from "../constants/Colors";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomeScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isReloading, setReloading] = useState(false);
  const [newsFeed, setNewsFeed] = useState([]);
  const [generalInfo, setGeneralInfo] = useState([]);

  useEffect(() => {
    if (!isReloading && !isLoading) return;
    news = NewsService.getRecentNews().then(setNewsFeed);
    general = CovidService.getGeneralInfo().then(setGeneralInfo);
    Promise.all([news, general]).then(() => {
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
      <View style={styles.generalInfoList}>
        <FlatList
          style={styles.generalInfoList}
          contentContainerStyle={styles.generalInfoListContainer}
          data={generalInfo.data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.numberGrid}>
              <NumberGrid type={item} />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isReloading}
              onRefresh={setReloading.bind(this, true)}
            />
          }
        />
      </View>

      {generalInfo.data.length > 0  &&
        <View style={styles.pieChart}>
          <CustomPieChart data={generalInfo.data} />
        </View>
      }

      <View style={styles.newsFeed}>
        { newsFeed.length > 0 &&
        <Text style={styles.newsFeedTitle}>Ultimas Notícias</Text>
        }
        <FlatList
          contentContainerStyle={styles.newsFeedListContainer}
          data={newsFeed.slice(0, screenHeight < 500 ? 2 : 3)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.newsFeedItem}>
              <ArticleItem
                article={item}
                onPress={() => {
                  Linking.openURL(item.url);
                }}
              />
            </View>
          )}
        />
      </View>
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
    backgroundColor: Colors.background,
  },
  generalInfoList: {
    maxHeight: "100%",
  },
  generalInfoListContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  numberGrid: {
    width: 150,
    height: 70,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  pieChart: { 
    height: 150,
    maxHeight: "20%"
  },
  newsFeed: {
    marginHorizontal: 30,
  },
  newsFeedTitle: {
    fontSize: 20,
    textAlign: "left",
    color: Colors.textLight,
  },
  newsFeedListContainer: {
    alignItems: "center",
  },
  newsFeedItem: {
    width: "100%",
    minWidth: "100%",
    marginVertical: 5,
    borderRadius: 15,
    overflow: "hidden"
  },
});

export default HomeScreen;
