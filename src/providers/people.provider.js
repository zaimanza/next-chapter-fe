

import { createSlice } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
    name: "people",
    initialState: {
        email: "",
    },
    reducers: {
        peopleLoginReducer: (state, action) => {

            state = action.payload;
        },
    },
});

export const { peopleLoginReducer } = peopleSlice.actions;

export default peopleSlice.reducer;
