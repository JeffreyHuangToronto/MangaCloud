/** @format */

import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";

const Navigation = () => {
    return (
        <View>
            <TouchableOpacity
                style={{ ...styles.nextChapter }}
                onPress={() => {
                    console.log("NEXT CHAPTER");
                    // console.log(showNav);
                }}></TouchableOpacity>
            <TouchableOpacity
                style={{ ...styles.prevChapter }}
                onPress={() => {
                    console.log("PREV CHAPTER");
                    // console.log(showNav);
                }}></TouchableOpacity>
        </View>
    );
};

export default Navigation;

const styles = StyleSheet.create({
    nextChapter: {
        zIndex: 10,
        position: "absolute",
        width: Dimensions.get("screen").width * 0.15,
        height: Dimensions.get("screen").width * 0.15,
        top: Dimensions.get("screen").height * 0.65,
        right: Dimensions.get("screen").width * 0.05,
        backgroundColor: "white",
    },
    prevChapter: {
        zIndex: 10,
        position: "absolute",
        width: Dimensions.get("screen").width * 0.15,
        height: Dimensions.get("screen").width * 0.15,
        top: Dimensions.get("screen").height * 0.65,
        left: Dimensions.get("screen").width * 0.05,
        backgroundColor: "white",
    },
});
