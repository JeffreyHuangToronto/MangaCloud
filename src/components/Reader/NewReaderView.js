/** @format */

import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DrawerActions, StackActions } from "@react-navigation/native";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import MangaImage from "./NewMangaImage";
import Navigation from "./Options/Navigation";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { connect } from "react-redux";
import { setCurrentManga } from "../../actions/Manga";

const { width, height } = Dimensions.get("window");
const api_url = "https://2e89-184-148-35-66.ngrok.io";
var chapter_pages;
const NewReaderView = (props) => {
  const [fetched, setFetched] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [offSet, setOffSet] = useState(0);
  const scale = new Animated.Value(1);

  const fetchChapter = async () => {
    let requestOptions = {
      method: "GET",
    };
    await fetch(
      `${api_url}/api/manga/getpages?manga_id=${props.currentManga._id}&chapter_number=${props.currentChapter.index}`,
      requestOptions
    )
      .then(async (response) => {
        chapter_pages = await (await response.json()).manga_pages;
        setFetched(true);
      })
      .catch((err) => {
        console.log(`Ran into error: ${err}`);
      });
  };
  // console.log(Animated.event([{ nativeEvent: { contentOffset: { x: _scrollX } } }]));
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
    // if (event.nativeEvent.oldState === State.ACTIVE) {
    //     Animated.timing(scale, {
    //         toValue: 1,
    //         // delay: 2000,
    //         useNativeDriver: true,
    //     }).start();
    // }
  };

  const mangaPage = (page_url) => {
    if (mounted) {
      return <MangaImage page_url={page_url} />;
    }
  };

  useEffect(() => {
    setMounted(true);
    if (!fetched) {
      fetchChapter();
    }

    return () => {
      setMounted(false);
      // chapter_pages = null;
    };
  }, [fetched]);

  return (
    // <View style={styles.background}>
    /* {fetched ? (
                <View
                    style={{
                        // ...styles.navBar,
                        opacity: props.showNav ? 0.85 : 0,
                    }}>
                    <Text style={styles.back} onPress={() => {}}>
                        {"<"} Back
                    </Text>
                    <Text style={styles.chapter}>
                        Ch. ({0}/{1})
                    </Text>
                    <Text style={styles.direction} onPress={() => {}}>
                        Swipe {true ? "Left <" : "Down V"}
                    </Text>
                </View>
            ) : (
                <></>
            )} */
    // <View style={styles.container}>
    // <ScrollView style={styles.container} maximumZoomScale={10}>
    <View>
      {/* <TouchableOpacity
                style={{ ...styles.nextChapter }}
                onPress={() => {
                    console.log("NEXT CHAPTER");
                    // console.log(showNav);
                }}></TouchableOpacity>
            <TouchableOpacity
                style={{ ...styles.prevChapter }}
                onPress={() => {
                    console.log("PREV CHAPTER");
                    // console.log(showNav);
                }}></TouchableOpacity> */}

      <FlatList
        // maximumZoomScale={10}
        data={chapter_pages}
        renderItem={mangaPage}
        keyExtractor={(key) => key}
        bouncesZoom={true}
        style={styles.reader}
        onScroll={(event) => {
          if (offSet > event.nativeEvent.contentOffset.y) {
            setShowNav(true);
          } else {
            setShowNav(false);
          }
          setOffSet(event.nativeEvent.contentOffset.y);
        }}
        ListHeaderComponent={<Navigation />}
        initialNumToRender={10}
        windowSize={50}
        bounces={false}
        ListEmptyComponent={
          <View
            style={{
              // backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              // flex: 1,
              // paddingTop: 20,
              // width: "100%",
              // position: "absolute",
              top: "50%",
              left: "50%",
              // height: "100%",
            }}
          >
            <Text style={{ color: "white", fontSize: 30 }}>Loading...</Text>
          </View>
        }
      />
      {/* <Navigation /> */}
    </View>
    // </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    manga: (manga) => dispatch(setCurrentManga(manga)),
    chapter: (chapter) => dispatch(setCurrentChapter(chapter)),
  };
};

const mapStateToProps = (state) => {
  // console.log(state.currentChapter);
  return {
    currentManga: state.currentManga,
    chapters: state.currentManga.chapters,
    currentChapter: state.currentChapter,
    showNav: state.currentChapter.showNav,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReaderView);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    // height:
    // height: "100000%",
    // position: "absolute",
    // zIndex: 0,
    // alignContent: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },
  nextChapter: {
    zIndex: 1,
    position: "absolute",
    width: Dimensions.get("screen").width * 0.15,
    height: Dimensions.get("screen").width * 0.15,
    top: Dimensions.get("screen").height * 0.65,
    right: Dimensions.get("screen").width * 0.05,
    backgroundColor: "white",
  },
  prevChapter: {
    zIndex: 1,
    position: "absolute",
    width: Dimensions.get("screen").width * 0.15,
    height: Dimensions.get("screen").width * 0.15,
    top: Dimensions.get("screen").height * 0.65,
    left: Dimensions.get("screen").width * 0.05,
    backgroundColor: "white",
  },
  reader: {
    zIndex: 0,
    width: "100%",
    overflow: "hidden",
  },

  openReaderOptions: {
    zIndex: 100,
    width: 100,
    height: 100,
    position: "absolute",
    backgroundColor: "white",
  },
});
