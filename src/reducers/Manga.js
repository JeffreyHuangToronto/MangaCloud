/** @format */

export default currentMangaReducer = (state = {}, action) => {
    if (action.type === "SET_CURRENT_MANGA") {
        return action.payload;
    }
    return state;
};
