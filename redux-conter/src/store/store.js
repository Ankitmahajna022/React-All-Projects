import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slice/counterSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});
