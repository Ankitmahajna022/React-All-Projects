import { configureStore } from "@reduxjs/toolkit";
import ;

export const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});
