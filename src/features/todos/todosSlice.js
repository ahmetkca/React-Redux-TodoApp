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

export const createTodoRequest = createAsyncThunk(
    "todos/createTodoRequest",
    async ({ text }, thunkAPI) => {
        const res = await fetch("http://localhost:8080/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        })
        const data = await res.json();

        if (!res.ok) {
            return thunkAPI.rejectWithValue(data);
        }
        thunkAPI.dispatch(addTodo(data));
        return data;
    }
);

export const deleteTodoRequest = createAsyncThunk(
    "todos/deleteTodoRequest",
    async ({ id }, thunkAPI) => {
        const res = await fetch(`http://localhost:8080/todos/${id}`, {
            method: "DELETE",
        })

        const data = await res.json();

        if (!res.ok) {
            return thunkAPI.rejectWithValue(data);
        }
        thunkAPI.dispatch(removeTodo(data));
        return data;
    }
);

export const markTodoAsCompleteRequest = createAsyncThunk(
    "todos/markTodoAsCompleteRequest",
    async ({ id }, thunkAPI) => {
        const res = await fetch(`http://localhost:8080/todos/${id}/complete`, {
            method: "PUT",
        })
        const data = await res.json();

        if (!res.ok) {
            return thunkAPI.rejectWithValue(data);
        }
        thunkAPI.dispatch(markTodoCompleted(data));
        return data;
    }
);


const todosSlice = createSlice({
    name: "todos",
    initialState: { todos: [], isLoading: false, isCreating: false, isDeleting: false },
    reducers: {
        addTodo: (state, action) => {
            console.log(`addTodo action dispatched: ${JSON.stringify(action.payload)}`);
            const todo = action.payload;
            state.todos.push({ ...todo });
        },
        removeTodo: (state, action) => {
            const todoToBeRemoved = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== todoToBeRemoved.id);
        },
        markTodoCompleted: (state, action) => {
            const todoToBeCompleted = action.payload;
            const todo = state.todos.find(todo => todo.id === todoToBeCompleted.id);
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
        },
        [createTodoRequest.pending]: (state) => {
            state.isCreating = true;
        },
        [createTodoRequest.fulfilled]: (state, { payload }) => {
            state.isCreating = false;
            console.log(`createTodoRequest fulfilled: ${JSON.stringify(payload)}`);
        },
        [createTodoRequest.rejected]: (state, { payload }) => {
            console.error(`createTodoRequest rejected: ${JSON.stringify(payload)}`);
            state.isCreating = false;
        },
        [deleteTodoRequest.pending]: (state) => {
            state.isDeleting = true;
        },
        [deleteTodoRequest.fulfilled]: (state, { payload }) => {
            state.isDeleting = false;
            console.log(`deleteTodoRequest fulfilled: ${JSON.stringify(payload)}`);
        },
        [deleteTodoRequest.rejected]: (state, { payload }) => {
            console.error(`deleteTodoRequest rejected: ${JSON.stringify(payload)}`);
            state.isDeleting = false;
        }
    }
});

export const { addTodo, removeTodo, markTodoCompleted, markTodoUncompleted } = todosSlice.actions;

export default todosSlice.reducer;