import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UsersSlice";

export const store=configureStore({
    reducer:{
        usre:userReducer
    }
})