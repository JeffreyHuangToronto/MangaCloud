/** @format */

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Dimensions } from "react-native";
import React from "react";
import { StackActions } from "@react-navigation/native";
import { connect } from "react-redux";
import { setCurrentManga } from "../../actions/Manga";
import { useNavigation } from "@react-navigation/native";

const Manga = (props) => {
    const { _id, manga_title } = props.manga;
    const navigation = useNavigation();
    return (
        <View style={styles.box}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    props.mangaObject({ ...props.manga });
                    navigation.dispatch(StackActions.push("Manga Details"));
                }}>
                <Image style={styles.image} source={{ uri: `https://mangakakalot.tv/mangaimage/${_id}.jpg` }} />
            </TouchableOpacity>
            <Text style={styles.text} numberOfLines={2}>
                {manga_title}
            </Text>
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        mangaObject: (mangaObject) => dispatch(setCurrentManga(mangaObject)),
    };
};

export default connect(null, mapDispatchToProps)(Manga);

let fullWidth = Dimensions.get("screen").width;
const originalImageWidth = 225;
const originalImageHeight = 330;

let newImageWidth, newImageHeight;

const aspectRatio = originalImageHeight / originalImageWidth;
let numberColumns = 3;

// This can be further simplified somehow using max and min
if (fullWidth / originalImageWidth < 3) {
    // Not enough room to fit 3 full sized images
    newImageWidth = fullWidth / numberColumns - 5 * numberColumns;
    newImageHeight = newImageWidth * aspectRatio;
} else {
    // Enough Room
    numberColumns = Math.floor(fullWidth / originalImageWidth);
    newImageWidth = originalImageWidth - 5 * numberColumns;
    newImageHeight = originalImageHeight;
}

const styles = StyleSheet.create({
    box: {
        width: newImageWidth,
        margin: 5,
    },
    image: {
        width: newImageWidth,
        height: newImageHeight,
    },
    text: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
    },
});
