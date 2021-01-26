/** @format */

export const setCurrentManga = (manga) => {
    return (dispatch) => {
        dispatch({ type: "SET_CURRENT_MANGA", payload: manga });
    };
};

export const setCurrentChapter = (chapter) => {
    return (dispatch) => {
        dispatch({ type: "SET_CURRENT_CHAPTER", payload: chapter });
    };
};

export const setShowNav = (boolean) => {
    return (dispatch) => {
        dispatch({ type: "SET_SHOW_NAV", payload: boolean });
    };
};

export const setFavorites = (state) => {
    return (dispatch) => {
        dispatch({ type: "SET_FAVORITES", payload: state });
    };
};

export const setHistory = (state) => {
    return (dispatch) => {
        dispatch({ type: "SET_HISTORY", payload: state });
    };
};

export const saveChapterToHistory = (chapter) => {
    return (dispatch) => {
        dispatch({ type: "SAVE_CHAPTER_TO_HISTORY", payload: chapter });
    };
};

export const removeChapterFromHistory = (chapter) => {
    return (dispatch) => {
        dispatch({ type: "REMOVE_CHAPTER_FROM_HISTORY", payload: chapter });
    };
};

export const clearChapterHistory = (chapter) => {
    return (dispatch) => {
        dispatch({ type: "CLEAR_CHAPTER_HISTORY", payload: chapter });
    };
};
