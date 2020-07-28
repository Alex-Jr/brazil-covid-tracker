import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";

const NumberGrid = (props) => {
  const { type } = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{Title[type.title]}</Text>
      </View>
      <View>
        <Text style={{ ...styles.quantity, ...{ color: Colors[type.title] } }}>
          {type.quantity}
        </Text>
      </View>
    </View>
  );
};

const Title = {
  confirmed: "Confirmados",
  recovered: "Recuperados",
  deaths: "Óbitos",
  new: "Novos Casos",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sections,
    padding: 10
  },
  title: {
    fontSize: 17,
    color: "rgb(196, 181, 158)",
  },
  quantity: {
    fontSize: 15,
  },
});

export default NumberGrid;
