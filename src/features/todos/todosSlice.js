import { createSlice } from "@reduxjs/toolkit";
import { randomId } from "../../utils/randomId";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos", 
    async () => {
        const res = await fetch("http://localhost:8080/todos")
            .then(data => data.json());
        return res;
    }
);


const todosSlice = createSlice({
    name: "todos",
    initialState: { todos: [], isLoading: false },
    reducers: {
        addTodo: (state, action) => {
            const { text } = action.payload;
            console.log(text);
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
    }, 
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTodos.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.todos = payload;
        },
        [fetchTodos.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const { addTodo, removeTodo, markTodoCompleted, markTodoUncompleted } = todosSlice.actions;

export default todosSlice.reducer;