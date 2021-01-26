/** @format */

/** @format */

// import React, { Component, PureComponent } from "react";
// import { Text, View } from "react-native";

import { Animated, Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { DrawerActions, StackActions } from "@react-navigation/native";
import { PinchGestureHandler, ScrollView, State } from "react-native-gesture-handler";
import React, { Fragment, PureComponent, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { connect } from "react-redux";
import { setShowNav } from "../../actions/Manga";

const NewMangaImage = (props) => {
    const page_url = props.page_url.item;
    const [ratio, setRatio] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [mounted, setMounted] = useState(true);
    const loadImage = async () => {
        await Image.prefetch(page_url).then(async () => {
            await Image.getSize(page_url, (width, height) => {
                setRatio(height / width);
                setLoaded(true);
            });
        });
    };

    useEffect(() => {
        setMounted(true);
        if (!loaded) {
            loadImage();
        }
        return () => {
            setMounted(false);
        };
    }, [loaded]);

    return (
        // <View style={styles.container}>
        <Image source={{ uri: page_url }} style={{ ...styles.mangaPage, height: Dimensions.get("screen").width * ratio }} />
        // {/* // <TouchableWithoutFeedback
        //     onLongPress={() => {
        //         console.log("Long Press");
        //         props.setShowNav(true);
        //     }}
        //     style={{ zIndex: 1 }}>
        // <ScrollView maximumZoomScale={2}> */}
        // </View>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        setShowNav: (boolean) => dispatch(setShowNav(boolean)),
    };
};

export default connect(null, mapDispatchToProps)(NewMangaImage);

const styles = StyleSheet.create({
    background: {
        backgroundColor: "black",
    },
    container: {
        width: "100%",
        // height: "100%",
        // backgroundColor: "white",
    },
    mangaPage: {
        width: Dimensions.get("screen").width,
        backgroundColor: "white",
        // alignContent: "center",
        // justifyContent: "center",
        // alignSelf: "center",
        // flexDirection: "column",
        // flex: 1,
        // opacity: 1,
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
