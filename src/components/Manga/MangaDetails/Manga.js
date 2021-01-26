/** @format */

import { FlatList, StyleSheet, View } from "react-native";

import ChapterComponent from "./Chapters";
import MangaInfo from "./MangaInfo";
import React from "react";

const Manga = () => {
    return (
        <View style={styles.container}>
            <FlatList ListHeaderComponent={MangaInfo} ListFooterComponent={ChapterComponent} />
        </View>
    );
};

export default Manga;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
});
