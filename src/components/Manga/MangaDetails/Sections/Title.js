/** @format */

import { StyleSheet, Text, View } from "react-native";

import React from "react";

const Title = (props) => {
    return (
        <View style={styles.mangaTitle}>
            <Text style={styles.manga}>{props.manga_title}</Text>
        </View>
    );
};

export default Title;

const styles = StyleSheet.create({
    mangaTitle: {
        alignSelf: "flex-end",
        bottom: 0,
    },
    manga: {
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
    },
});
