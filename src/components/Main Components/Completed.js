/** @format */

import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import Manga from "../Manga/Manga";
import { connect } from "react-redux";

const manga = ({ item }) => {
    return <Manga key={item._id} manga={item} />;
};

const Completed = () => {
    const [completedManga, setCompletedManga] = useState([]);
    const [page, setPage] = useState(0);
    async function fetchCompleted(page) {
        let requestOptions = {
            method: "GET",
        };
        await fetch(`https://mangacloud.azurewebsites.net/api/manga/getcompletedlist?source=MangaKakalot&page=${page}`, requestOptions).then(
            async (response) => {
                setCompletedManga(completedManga.concat(await response.json()));
            }
        );
    }
    useEffect(() => {
        fetchCompleted(page);
    }, [page]);
    return (
        <View style={styles.scroll}>
            <FlatList
                data={completedManga}
                renderItem={manga}
                keyExtractor={(manga) => manga._id}
                numColumns={3}
                // refreshing={refreshing}
                // onRefresh={onRefresh}
                onEndReachedThreshold={-0.2}
                onEndReached={() => {
                    setPage(page + 1);
                }}
            />
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        currentManga: state.currentManga,
    };
};

export default connect(mapStateToProps)(Completed);

const styles = StyleSheet.create({
    Manga: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        height: "100%",
        width: "100%",
    },
    scroll: {
        flexDirection: "column",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        alignContent: "flex-start",
    },
    testButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
