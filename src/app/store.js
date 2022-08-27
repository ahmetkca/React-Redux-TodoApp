import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import filterByReducer from "../features/filterBy/filterBySlice";
import thunk from "redux-thunk";

// redux-persist
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["todos", "filterBy"]
};

const rootReducer = combineReducers({
    todos: todosReducer,
    filterBy: filterByReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);  

export const store = configureStore({ 
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export const persistor = persistStore(store);
