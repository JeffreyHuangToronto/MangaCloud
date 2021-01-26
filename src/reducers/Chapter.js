/** @format */

const currentChapterReducer = (state = { index: 0, showNav: false }, action) => {
    if (action.type === "SET_CURRENT_CHAPTER") {
        state["index"] = action.payload;
    }
    if (action.type === "SET_SHOW_NAV") {
        state["showNav"] = action.payload;
    }
    return state;
};

export default currentChapterReducer;
