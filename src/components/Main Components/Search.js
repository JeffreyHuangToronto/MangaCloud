/** @format */

import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import Manga from "../Manga/Manga";
import { TextInput } from "react-native-gesture-handler";

// import { useNavigation, useRoute } from "@react-navigation/native";

// import { MangaCover } from "../Styles/index";
// import { StorageHandler } from "../Storage/index";

// import Manga from "./Manga";

var searchResults = [];
let numberOfColumns = Math.floor((Dimensions.get("screen").width - 20) / 75);

const Search = () => {
  const [contentLoaded, setContentLoaded] = useState(false);

  const manga = ({ item }) => {
    return <Manga key={item._id} manga={item} />;
  };

  async function search(search_query) {
    let requestOptions = {
      method: "GET",
    };

    await fetch(
      `https://13ce-184-148-35-66.ngrok.io/api/manga/database/search?search_query=${search_query}&source=MangaKakalot`,
      requestOptions
    ).then(async (response) => {
      searchResults = await response.json();
      setContentLoaded(true);
    });
  }

  useEffect(() => {
    setContentLoaded(false);
    return () => {};
  }, [contentLoaded]);

  return (
    <View style={styles.scroll}>
      <TextInput
        style={styles.textInput}
        placeholder={"Search"}
        onEndEditing={(event) => {
          var query = event.nativeEvent.text;
          search(query);
        }}
      ></TextInput>
      <FlatList
        data={searchResults}
        renderItem={manga}
        keyExtractor={(manga) => manga._id}
        numColumns={3}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  Manga: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
  },
  scroll: {
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    alignContent: "flex-start",
  },
  testButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textInput: {
    width: "100%",
    height: "7%",
    backgroundColor: "grey",
  },
});
