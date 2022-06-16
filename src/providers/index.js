import { configureStore } from "@reduxjs/toolkit";
import peopleProvider from "./people.provider";

export const store = configureStore({
    reducer: {
        people: peopleProvider,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
