/** @format */

import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { setFavorites, setHistory } from "../../actions/Manga";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Manga from "../Manga/Manga";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const Favorites = (props) => {
    const isFocused = useIsFocused();
    const manga = ({ item }) => {
        return <Manga key={item._id} manga={item} />;
    };
    const [FavoritesList, setFavoritesList] = useState(props.currentFavorites["list"]);

    const [loaded, setLoaded] = useState(false);

    const loadSavedItems = async () => {
        if (!loaded) {
            const history = JSON.parse(await AsyncStorage.getItem("@historyState"));
            const favorites = JSON.parse(await AsyncStorage.getItem("@favoriteState"));

            if (history != null) {
                await props.setHistoryState(history);
            }
            if (favorites != null) {
                await props.setFavoriteState(favorites);
            }
            setFavoritesList(props.currentFavorites["list"]);
            setLoaded(true);
            // console.log("Loaded!");
        }
    };

    useEffect(() => {
        loadSavedItems();
        setFavoritesList(props.currentFavorites["list"]);
    }, [isFocused, loaded]);

    return (
        <>
            {props.currentFavorites["list"].length == 0 ? (
                <View style={styles.defaultWelcome}>
                    <Text style={styles.Title}>Welcome to Manga Cloud!</Text>
                    <Text style={styles.Body}>
                        This is your favorites library, manga that you favorite goes here. Start reading and come back anytime here!
                    </Text>
                </View>
            ) : (
                // Show their favorited mangas
                <>
                    <View style={styles.scroll}>
                        <FlatList
                            style={styles.flatlist}
                            data={FavoritesList}
                            renderItem={manga}
                            keyExtractor={(manga) => manga._id}
                            numColumns={3}
                            extraData={props.currentFavorites["list"]}
                        />
                    </View>
                </>
            )}
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFavoriteState: (state) => dispatch(setFavorites(state)),
        setHistoryState: (state) => dispatch(setHistory(state)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentFavorites: state.currentFavorites,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

const styles = StyleSheet.create({
    defaultWelcome: {
        alignItems: "flex-start",
        margin: 5,
        padding: 5,
    },
    flatlist: {
        width: "100%",
        height: "100%",
    },
    clearlist: {
        alignSelf: "flex-end",
    },
    Title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "white",
        justifyContent: "flex-start",
    },
    Body: {
        fontSize: 18,
        color: "white",
        justifyContent: "center",
    },
});
