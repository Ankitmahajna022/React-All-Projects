import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import chatReducer from "../Slices/chatSlice";


export const store=configureStore({
    reducer:{
        users:userReducer,
        chats:chatReducer
    }
})