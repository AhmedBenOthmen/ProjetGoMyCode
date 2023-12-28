import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";

export const Store = configureStore({
    reducer: {
        auth: authReducer,
    },
})