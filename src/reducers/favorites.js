/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";

const currentFavoritesReducer = (state = { favorites: {}, list: [] }, action) => {
    if (action.type === "SET_FAVORITES") {
        state = action.payload;
        // AsyncStorage.setItem("@favoriteState", JSON.stringify(state));
        // console.log("Favorites Saved");
    }
    if (action.type === "FAVORITE_MANGA") {
        state["favorites"][action.payload._id] = true;
        state["list"].push(action.payload);
        AsyncStorage.setItem("@favoriteState", JSON.stringify(state));
        // console.log("Favorites Saved");
    }
    if (action.type === "UN_FAVORITE_MANGA") {
        delete state["favorites"][action.payload._id];
        state["list"] = state["list"].filter((manga) => manga._id != action.payload._id);
        AsyncStorage.setItem("@favoriteState", JSON.stringify(state));
        // console.log("Favorites Saved");
    }
    return state;
};

export default currentFavoritesReducer;
