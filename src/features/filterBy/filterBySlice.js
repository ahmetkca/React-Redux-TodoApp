import { createSlice } from "@reduxjs/toolkit";

const filterBySlice = createSlice({
    name: "filterBy",
    initialState: { filterBy: "all" },
    reducers: {
        showAll: state => {
            state.filterBy = "all";
        },
        showCompleted: state => {
            state.filterBy = "completed";
        },
        showUncompleted: state => {
            state.filterBy = "uncompleted";
        }
    }
});

export const { showAll, showCompleted, showUncompleted } = filterBySlice.actions;

export default filterBySlice.reducer;