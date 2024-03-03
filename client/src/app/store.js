// store.js
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authReducer from "../features/userRegister/authSlice"

const store = configureStore({
    reducer: {
        auth:authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true//לא שלכוח לשנות בהמשך לfalse
});

export default store;