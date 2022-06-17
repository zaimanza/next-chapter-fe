

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            email: "",
            password: ""
        }
    },
    reducers: {
        authSetAllReducer: (state, action) => {
            const { email, password } = action.payload
            state = {
                email: email,
                password: password
            };
        },
        authSetEmailReducer: (state, action) => {
            const { email } = action.payload
            state.value = {
                email: email,
                password: state.value.password,
            }
        },
        authSetPasswordReducer: (state, action) => {
            const { password } = action.payload
            state.value = {
                email: state.value.email,
                password: password,
            }
        },
    },
});

export const {
    authSetAllReducer,
    authSetEmailReducer,
    authSetPasswordReducer
} = authSlice.actions;

export default authSlice.reducer;
