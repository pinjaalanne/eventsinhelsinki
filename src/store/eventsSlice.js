import { createSlice } from "@reduxjs/toolkit";
import eventsService from "../services/events";

export const initializeEvents = () => {
    return async (dispatch) => {
        const events = await eventsService.getAll();
        dispatch(getEvents(events));
        setTimeout(() => {
            dispatch(isLoading(false));
        }, 1000);
    }
};

export const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: [], // to access this state, use useSelector((state) => state.events.events)
        isLoading: true, // to access this state, use useSelector((state) => state.events.isLoading)
    },
    reducers: {
        getEvents: (state, action) => {
            state.events = action.payload;
            state.isLoading = false;
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const { getEvents, isLoading } = eventsSlice.actions;

export default eventsSlice.reducer;