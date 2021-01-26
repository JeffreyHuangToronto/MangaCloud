/** @format */

/** @format */

/** @format */

import { Animated, Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { DrawerActions, StackActions } from "@react-navigation/native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import React, { Fragment, useEffect, useState } from "react";
import { interpolate, max, min } from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Dimensions } from "react-native";
import MangaImage from "./MangaImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";

// import { useDimensions } from "@react-native-community/hooks";

// import { Constants, MangaStyles } from "../Styles";

var chapterObject;
var chapter_pages;
var chapter_pages_size;
var mounted = true;
var pageView;
const ChapterView = (props) => {
    // Hooks
    const navigation = useNavigation();
    const route = useRoute();
    // const dimensions = useDimensions();
    // States
    const [reload, setReload] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [once, setOnce] = useState(false);
    const [bookView, SetBookView] = useState(false);
    const [ChapterIndex, setChapterIndex] = useState(route.params.ChapterIndex);
    const [endReached, setEndReached] = useState(false);
    const api_url = "https://mangacloud.azurewebsites.net";

    // Constants
    const Width = Dimensions.get("screen").width;
    const Height = Dimensions.get("screen").height;
    const Manga = props.currentManga;
    const scale = new Animated.Value(1);

    const onPinchEvent = Animated.event(
        [
            {
                nativeEvent: { scale: scale },
            },
        ],
        {
            useNativeDriver: true,
        }
    );

    const onPinchStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.timing(scale, {
                toValue: 1,
                delay: 2000,
                useNativeDriver: true,
            }).start();
        }
    };

    async function fetchChapter() {
        let requestOptions = {
            method: "GET",
        };
        fetch(`${api_url}/api/manga/getpages?manga_id=${Manga._id}&chapter_number=${ChapterIndex + 1}`, requestOptions);
        await fetch(`${api_url}/api/manga/getpages?manga_id=${Manga._id}&chapter_number=${ChapterIndex}`, requestOptions).then(async (response) => {
            chapterObject = await response.json();
            chapter_pages = await chapterObject.manga_pages;
            for (var i = 0; i < chapter_pages.length; i++) {
                if (mounted) {
                    await Image.prefetch(chapter_pages[i]).then(() => {
                        // console.log("Pre");
                        if (mounted && chapter_pages[i] != null) {
                            Image.getSize(chapter_pages[i], async (width, height) => {
                                if (mounted && chapter_pages[i] != null) {
                                    if (i == chapterObject.number_of_manga_pages - 1) {
                                        setReload(true);
                                    }
                                    chapter_pages_size.push([width, height]);
                                    setReload(true);
                                }
                            });
                        }
                    });
                    setContentLoaded(true);
                }
            }
        });
    }

    const mangaPage = (data) => {
        let width, height, ratio;
        if (data.index <= chapter_pages_size.length - 1) {
            width = chapter_pages_size[data.index][0];
            height = chapter_pages_size[data.index][1];
            ratio = height / width;
            return <MangaImage Width={Width} ratio={ratio} data={data} />;
        }
    };

    useEffect(() => {
        setReload(false);
        mounted = true;
        if (!once) {
            chapter_pages_size = [];
            chapter_pages = [];
            fetchChapter();
            setOnce(!once);
        }

        return () => {
            mounted = false;
        };
    }, [reload]);
    return (
        <View style={styles.background}>
            {contentLoaded ? (
                <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={onPinchStateChange}>
                    <Animated.FlatList
                        data={chapter_pages}
                        renderItem={mangaPage}
                        keyExtractor={(key) => key}
                        onEndReached={() => {
                            setEndReached(true);
                            // navigation.dispatch(StackActions.push("Manga Chapter View", { Manga: Manga, ChapterIndex: ChapterIndex + 1 }));
                        }}
                        ListFooterComponent={
                            <View style={bookView ? styles.right : styles.footer}>
                                <Button
                                    title={"Prev Chapter"}
                                    onPress={() => {
                                        if (ChapterIndex != 0) {
                                            setChapterIndex(ChapterIndex - 1);
                                            setOnce(false);
                                            setContentLoaded(false);
                                            setReload(true);
                                        }
                                    }}
                                />
                                <Button
                                    title={bookView ? "Scroll View" : "BookView"}
                                    onPress={() => {
                                        SetBookView(!bookView);
                                    }}
                                />
                                <Button
                                    title={ChapterIndex == Manga.chapters.length - 1 ? "End Reached" : "Next Chapter"}
                                    onPress={() => {
                                        if (ChapterIndex == Manga.chapters.length - 1) {
                                            navigation.goBack();
                                        } else {
                                            setChapterIndex(ChapterIndex + 1);
                                            setOnce(false);
                                            setContentLoaded(false);
                                            setReload(true);
                                        }
                                    }}
                                />
                            </View>
                        }
                        style={{
                            ...styles.reader,
                            transform: [{ scale: scale }],
                        }}
                        onEndReachedThreshold={0}
                        pagingEnabled={bookView}
                        horizontal={bookView}
                        initialNumToRender={20}
                    />
                </PinchGestureHandler>
            ) : (
                <></>
            )}
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        currentManga: state.currentManga,
    };
};

export default connect(mapStateToProps)(ChapterView);

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
        backgroundColor: "black",
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
