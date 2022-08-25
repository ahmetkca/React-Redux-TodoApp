import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todosSlice";
import filterByReducer from "./features/filterBy/filterBySlice";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        filterBy: filterByReducer
    }
});