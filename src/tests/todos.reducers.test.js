import { describe, it, expect } from "vitest";

import todosReducer from "../features/todos/todosSlice.js";
import { addTodo } from "../features/todos/todosSlice.js";

describe("The todos reducers", () => {
    const state = {
        todos: [],
        isLoading: false,
        isCreating: false,
        isDeleting: false
    }

    it("Adds a new todo when 'todos/addTodo' action is dispatched", () => {
        const initialState = { ...state, todos: [] };
        const testTodo = { text: "Learn Redux", isCompleted: false, id: 1, createdAt: Date.now() };
        const action = addTodo(testTodo);
        const expectedState = { ...state, todos: [ { ...testTodo }, ], };
        
        expect(todosReducer(initialState, action)).to.deep.equal(expectedState);
    })

    it("Removes a todo when 'todos/removeTodo' action is dispatched", () => {
        const initialState = { ...state, todos: [ { text: "Learn Redux", isCompleted: false, id: 1, createdAt: Date.now() } ] };
        const testPayload = { id: 1 };
        const action = { type: "todos/removeTodo", payload: testPayload };
        const expectedState = { ...state, todos: [] };

        expect(todosReducer(initialState, action)).to.deep.equal(expectedState);
    })

    it("Marks a todo as completed when 'todos/markTodoCompleted' action is dispatched", () => {
        const testTodo = { text: "Learn Redux", isCompleted: false, id: 1, createdAt: Date.now() }
        const initialState = { ...state, todos: [ { ...testTodo } ] };
        const testPayload = { id: 1 };
        const action = { type: "todos/markTodoCompleted", payload: testPayload };
        const expectedState = { ...state, todos: [ { ...testTodo, isCompleted: true } ] };

        expect(todosReducer(initialState, action)).to.deep.equal(expectedState);
    })
})