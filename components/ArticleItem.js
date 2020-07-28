import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../constants/Colors";

const ArticleItem = (props) => {
  const { article } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text numberOfLines={2} style={styles.articleText}>{article.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sections
  },
  articleText:{
    color: "rgb(196, 181, 158)",
    padding:10
  }
});

export default ArticleItem;
