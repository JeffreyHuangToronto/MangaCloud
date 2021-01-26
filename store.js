/** @format */

import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import chapterHistory from "./src/reducers/History";
import currentChapter from "./src/reducers/Chapter";
import currentFavorites from "./src/reducers/favorites";
import currentManga from "./src/reducers/Manga";
import thunk from "redux-thunk";

const reducer = combineReducers({
    currentManga,
    currentChapter,
    currentFavorites,
    chapterHistory,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
