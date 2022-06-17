import { configureStore } from "@reduxjs/toolkit";
import authProvider from "./auth.provider";
import peopleProvider from "./people.provider";

export const store = configureStore({
    reducer: {
        people: peopleProvider,
        auth: authProvider,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
