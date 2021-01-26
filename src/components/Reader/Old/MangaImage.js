/** @format */

/** @format */

// import React, { Component, PureComponent } from "react";
// import { Text, View } from "react-native";

import { Animated, Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { DrawerActions, StackActions } from "@react-navigation/native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import React, { Fragment, PureComponent, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Dimensions } from "react-native";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

export class MangaImage extends PureComponent {
    render() {
        const { data, Width, ratio } = this.props;
        return (
            <Animated.Image
                source={{ uri: data.item }}
                style={{ ...styles.mangaPage, width: Width, height: Width * ratio, transform: [{ scale: this.scale }] }}
            />
        );
    }
}

export default MangaImage;

const styles = StyleSheet.create({
    background: {
        backgroundColor: "black",
    },
    mangaPage: {
        width: Dimensions.get("screen").width,
        backgroundColor: "black",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        opacity: 1,
    },
    reader: {
        zIndex: 0,
        alignSelf: "center",
        height: "100%",
    },
    footer: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingBottom: "10%",
    },
    right: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        height: "100%",
    },
});
