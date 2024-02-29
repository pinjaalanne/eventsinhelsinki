import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";
import favoritesReducer from "./favoriteSlice";

export default configureStore({
    reducer: {
        events: eventsReducer,
        favorites: favoritesReducer,
    },
});

