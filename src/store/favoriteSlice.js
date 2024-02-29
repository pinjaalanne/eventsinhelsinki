import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        favorites: [],
    },
    reducers: {
        addFavorite(state, action) {
            if (state.favorites.some((event) => event.name.common === action.payload.name.common))
                return;
            state.favorites = [...state.favorites, action.payload];
        },
        removeOneFavorite(state, action) {
            state.favorites = state.favorites.filter((favorite) => favorite.name.common !== action.payload.name.common);
        },
        clearFavorites(state, action) {
            state.favorites = [];
        },
    },
});

export const { addFavorite, clearFavorites, removeOneFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;