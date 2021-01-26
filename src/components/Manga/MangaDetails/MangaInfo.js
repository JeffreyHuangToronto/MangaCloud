/** @format */

/** @format */

import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Buttons from "./Sections/Buttons";
import Cover from "./Sections/Cover";
import { Dimensions } from "react-native";
import React from "react";
import { StackActions } from "@react-navigation/native";
import Summary from "./Sections/Summary";
import Title from "./Sections/Title";
import { connect } from "react-redux";
import { setCurrentManga } from "../../../actions/Manga";
import { useNavigation } from "@react-navigation/native";

let chapterButtonWidth = 75;
let numberOfColumns = Math.floor((Dimensions.get("screen").width - 20) / chapterButtonWidth);

const Chapter = React.memo((props) => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.upperCard}>
                <Cover _id={props.currentManga._id} />
                <View style={styles.titleBox}>
                    <Title manga_title={props.currentManga.manga_title} />
                    <Buttons />
                </View>
            </View>
            <Summary summary={props.currentManga.summary} />
        </>
    );
});

const mapDispatchToProps = (dispatch) => {
    return {
        mangaObject: (mangaObject) => dispatch(setCurrentManga(mangaObject)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentManga: state.currentManga,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);

const styles = StyleSheet.create({
    titleBox: {
        flexDirection: "column",
        flexWrap: "wrap",
        flex: 1,
        padding: 10,
    },
    upperCard: {
        flexDirection: "row",
        margin: 10,
    },
});
