/** @format */

import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import React from "react";
import { connect } from "react-redux";

const Cover = (props) => {
    return <Image style={styles.coverImage} source={{ uri: `https://mangakakalot.tv/mangaimage/${props._id}.jpg` }} />;
};

export default Cover;

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

const styles = StyleSheet.create({
    coverImage: {
        width: newImageWidth,
        height: newImageHeight,
    },
});
