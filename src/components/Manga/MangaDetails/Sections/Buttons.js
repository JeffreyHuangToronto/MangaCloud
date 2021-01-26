/** @format */

/** @format */

import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { favorite, unFavorite } from "../../../../actions/Favorites";

import { connect } from "react-redux";
import { saveChapterToHistory } from "../../../../actions/Manga";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Buttons = (props) => {
    const [favorited, setFavorited] = useState(props.currentFavorites["favorites"][props.currentManga._id] != undefined);
    const historyArr = props.history[props.currentManga._id];
    const [latest, setLatest] = useState(
        historyArr != undefined ? props.currentManga.chapters[Math.max(...historyArr)] : props.currentManga.chapters[0]
    );
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        setLatest(historyArr != undefined ? props.currentManga.chapters[Math.max(...historyArr)] : props.currentManga.chapters[0]);
    }, [isFocused]);
    return (
        <View style={styles.buttonLayout}>
            <Button
                title={!favorited ? "Favorite" : "UnFavorite"}
                onPress={() => {
                    if (!favorited) {
                        props.favorite(props.currentManga);
                        setFavorited(true);
                    } else {
                        props.unFavorite(props.currentManga);
                        setFavorited(false);
                    }
                }}
            />
            <Button
                title={historyArr != undefined ? "Continue: " + latest : "Read"}
                onPress={() => {
                    if (historyArr == undefined) {
                        props.addChapterToHistory({ ...props.currentManga, chapter_index: 0 });
                    }
                    navigation.navigate("Manga Reader", {
                        Manga: props.currentManga,
                        ChapterIndex: historyArr != undefined ? Math.max(...historyArr) : 0,
                    });
                }}
            />
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        favorite: (manga) => dispatch(favorite(manga)),
        unFavorite: (manga) => dispatch(unFavorite(manga)),
        addChapterToHistory: (manga) => dispatch(saveChapterToHistory(manga)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentManga: state.currentManga,
        currentFavorites: state.currentFavorites,
        history: state.chapterHistory,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);

const styles = StyleSheet.create({
    buttonLayout: {
        flexDirection: "row",
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
    },
});
