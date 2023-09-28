import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

// TESTING IMAGE DISPLAY ON THE GALLERY USING AN ARRAY
const images = [
  { id: "1", source: require("../assets/favicon.png") },
  { id: "2", source: require("../assets/favicon.png") },
  { id: "3", source: require("../assets/favicon.png") },
  { id: "4", source: require("../assets/favicon.png") },
  { id: "5", source: require("../assets/favicon.png") },
  { id: "6", source: require("../assets/favicon.png") },
  { id: "7", source: require("../assets/favicon.png") },
];

const numColumns = 3; // Grid columns

const GalleryScreen = () => {
  const renderItem = ({ item }) => (
    <Image source={item.source} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.galleryView}
        data={images.sort((a, b) => a.id - b.id)} //Sort images by id in ascending order
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  image: {
    flex: 1,

    // margin: 5,
    minWidth: 80,
    maxWidth: 120,

    minHeight: 80,
    maxHeight: 120,
    // backgroundColor: '#CCC',
    margin: 1,
    backgroundColor: "#f3f499",
    alignItems: "center",
    justifyContent: "space-around",
  },
  galleryView: {
    flex: 1,
    // position: "relative",
    // gap: 4,
    alignItems: "row",

    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default GalleryScreen;
