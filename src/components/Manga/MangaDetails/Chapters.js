/** @format */

/** @format */

import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { saveChapterToHistory, setCurrentChapter, setCurrentManga } from "../../../actions/Manga";

import { Dimensions } from "react-native";
import React from "react";
import { StackActions } from "@react-navigation/native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

let chapterButtonWidth = 75;
let numberOfColumns = Math.floor((Dimensions.get("screen").width - 20) / chapterButtonWidth);
const Chapter = React.memo((props) => {
    const navigation = useNavigation();
    const chapter = (data) => {
        return (
            <TouchableOpacity
                style={styles.chapterButtons}
                onPress={async () => {
                    props.addChapterToHistory({ ...props.currentManga, chapter_index: data.index });
                    props.setCurrentChapter(data.index);
                    navigation.navigate("Manga Reader");
                }}>
                <Text style={{ color: Platform.OS === "ios" ? "white" : "#2196F3" }}>{data.item.toString()}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <>
            <FlatList
                data={props.chapters}
                renderItem={chapter}
                keyExtractor={(manga) => manga}
                numColumns={numberOfColumns}
                initialNumToRender={20}
            />
        </>
    );
});

const mapDispatchToProps = (dispatch) => {
    return {
        mangaObject: (manga) => dispatch(setCurrentManga(manga)),
        addChapterToHistory: (manga) => dispatch(saveChapterToHistory(manga)),
        setCurrentChapter: (index) => dispatch(setCurrentChapter(index)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentManga: state.currentManga,
        chapters: state.currentManga.chapters,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
let fullWidth = Dimensions.get("screen").width;
const originalImageWidth = 225;
const originalImageHeight = 330;

let newImageWidth, newImageHeight;

const aspectRatio = originalImageHeight / originalImageWidth;
let numberColumns = 3;

let margin = 5;

// This can be further simplified somehow using max and min
if (fullWidth / originalImageWidth < 3) {
    // Not enough room to fit 3 full sized images
    newImageWidth = fullWidth / numberColumns - margin * numberColumns;
    newImageHeight = newImageWidth * aspectRatio;
} else {
    // Enough Room
    numberColumns = Math.floor(fullWidth / originalImageWidth);
    newImageWidth = originalImageWidth - margin * numberColumns;
    newImageHeight = originalImageHeight;
}

export const NumberOfColumns = numberColumns;

export const Box = {
    width: newImageWidth,
    margin: margin,
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
    buttonLayout: {
        flexDirection: "row",
        alignSelf: "center",
        // position: "absolute",
        // bottom: 0,
        width: "100%",
        flexWrap: "wrap",
        alignSelf: "center",
    },
    chapters: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        margin: 5,
        // height: "100%",
    },
    chapterButtons: {
        width: chapterButtonWidth,
        margin: 5,
        backgroundColor: "rgba(46,38,38, 0.8)",
        borderRadius: 10,
        padding: 5,
    },
});
