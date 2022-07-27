

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
        peopleSetEmailReducer: (state, action) => {
            console.log("LALU_REDUCER")
            // console.log(action.payload)
            const temp_value = state.value.email
            console.log(temp_value)
            state.value.email = action.payload.email
            console.log(state.value.email)
            localStorage.setItem('peopleCredential', JSON.stringify(state.value));
        },
    },
});

export const {
    peopleLoginReducer,
    peopleLogoutReducer,
    peopleSetEmailReducer
} = peopleSlice.actions;

export default peopleSlice.reducer;
