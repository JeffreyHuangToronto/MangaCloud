/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";

export default chapterHistory = (state = {}, action) => {
    if (action.type === "SAVE_CHAPTER_TO_HISTORY") {
        if (state[action.payload._id] == undefined) {
            state[action.payload._id] = [action.payload.chapter_index];
        } else if (state[action.payload._id].indexOf(action.payload.chapter_index) == -1) {
            state[action.payload._id].push(action.payload.chapter_index);
        }
        AsyncStorage.setItem("@historyState", JSON.stringify(state));
    }
    if (action.type === "SET_HISTORY") {
        state = action.payload;
        // console.log("History Saved");
    }
    return state;
};
