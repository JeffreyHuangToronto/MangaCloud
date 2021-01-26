/** @format */

export const favorite = (manga) => {
    return (dispatch) => {
        dispatch({ type: "FAVORITE_MANGA", payload: manga });
    };
};
export const unFavorite = (manga) => {
    return (dispatch) => {
        dispatch({ type: "UN_FAVORITE_MANGA", payload: manga });
    };
};
