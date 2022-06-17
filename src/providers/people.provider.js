

import { createSlice } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
    name: "people",
    initialState: {
        value: {
            email: "",
            access_token: "",
        }
    },
    reducers: {
        peopleLoginReducer: (state, action) => {

            state.value = action.payload;
        },
    },
});

export const { peopleLoginReducer } = peopleSlice.actions;

export default peopleSlice.reducer;
