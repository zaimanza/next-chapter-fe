

import { createSlice } from "@reduxjs/toolkit";

const initValue = {
    access_token: "",
    created_at: "",
    email: "",
    isemailverify: "",
    uid: "",
    updated_at: ""
}

export const peopleSlice = createSlice({
    name: "people",
    initialState: {
        value: typeof window !== 'undefined' ? localStorage.getItem('peopleCredential')
            ? JSON.parse(localStorage.getItem('peopleCredential'))
            : initValue : initValue,
    },
    reducers: {
        peopleLoginReducer: (state, action) => {
            state.value = action.payload
            localStorage.setItem('peopleCredential', JSON.stringify(action.payload));
        },
        peopleLogoutReducer: (state, action) => {
            state.value = initValue
            localStorage.removeItem("peopleCredential")
        },
    },
});

export const {
    peopleLoginReducer,
    peopleLogoutReducer
} = peopleSlice.actions;

export default peopleSlice.reducer;
