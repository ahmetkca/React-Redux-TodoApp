import { createSlice } from "@reduxjs/toolkit";
import { randomId } from "../utils/randomId";

const todosSlice = createSlice({
    name: "todos",
    initialState: { todos: [] },
    reducers: {
        addTodo: (state, action) => {
            const { text } = action.payload;
            state.todos.push({ id: randomId() + state.todos.length + 1, text, isCompleted: false });
        },
        removeTodo: (state, action) => {
            const { id } = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== id);
        },
        markTodoCompleted: (state, action) => {
            const { id } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.isCompleted = true;
            }
        },
        markTodoUncompleted: (state, action) => {
            const { id  } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.isCompleted = false;
            }
        }
    }
});

export const { addTodo, removeTodo, markTodoCompleted, markTodoUncompleted } = todosSlice.actions;

export default todosSlice.reducer;