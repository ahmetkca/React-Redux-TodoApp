import { describe, it, expect, afterAll, afterEach, beforeAll } from "vitest";

import { setupServer } from "msw/node";
import { rest } from "msw";

import todosReducer, { markTodoCompleted, removeTodo, fetchTodos, createTodoRequest, deleteTodoRequest } from "../features/todos/todosSlice.js";
import { addTodo } from "../features/todos/todosSlice.js";

import { configureStore, combineReducers, thunk } from "@reduxjs/toolkit";

import { fetch } from "cross-fetch";
global.fetch = fetch;

const todos = [
    {
        id: 1,
        text: "Learn React",
        isCompleted: false,
        createdAt: 1601131200000,
    },
    {
        id: 2,
        text: "Learn Redux",
        isCompleted: false,
        createdAt: 1622514400000,
    },
]

export const restHandlers = [
    rest.get('http://localhost:8080/todos', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(todos), ctx.delay(10));
    }),
    rest.post('http://localhost:8080/todos', async (req, res, ctx) => {
        const { text } = await req.json();
        if (todos.some(todo => todo.text === text)) {
            return res(ctx.status(409), ctx.json({ name: "Conflict", message: "Todo already exists" }));
        }
        const newTodo = {
            id: 3,
            text,
            isCompleted: false,
            createdAt: 16548794225124,
        }
        // todos = [...todos, { ...newTodo }];
        return res(ctx.status(200), ctx.json(newTodo), ctx.delay(10));
    }),
    rest.delete('http://localhost:8080/todos/:id', (req, res, ctx) => {
        const { id } = req.params;
        console.log(`id: ${id}`);
        const todo = todos.find(todo => todo.id === Number(id));
        if (!todo) {
            return res(ctx.status(404), ctx.json({ name: "Not Found", message: "Todo not found" }));
        }
        return res(ctx.status(200), ctx.json(todo), ctx.delay(10));
    }),
]
const server = setupServer(...restHandlers);



describe("The todos slice", () => {

    describe("The todos thunks", () => {
        const rootReducer = combineReducers({
            todos: todosReducer,
        });
        const store = configureStore({
            reducer: rootReducer,
        });

        beforeAll(() => server.listen({ onUnhandledRequest: 'error', }));
        afterAll(() => server.close());
        afterEach(() => server.resetHandlers());

        it("should fetch all todos and set todos state", async () => {
            await store.dispatch(fetchTodos());

            expect(store.getState()).to.deep.equal({
                todos: {
                    todos: [ {
                        id: 1,
                        text: "Learn React",
                        isCompleted: false,
                        createdAt: 1601131200000,
                    },
                    {
                        id: 2,
                        text: "Learn Redux",
                        isCompleted: false,
                        createdAt: 1622514400000,
                    }, ],
                    isLoading: false,
                    isCreating: false,
                    isDeleting: false,
                }
            });
        })

        it("should create a new todo and add it to the todos state", async () => {
            await store.dispatch(createTodoRequest({ text: "Learn React Native" }));

            expect(store.getState()).to.deep.equal({
                todos: {
                    todos: [ {
                        id: 1,
                        text: "Learn React",
                        isCompleted: false,
                        createdAt: 1601131200000,
                    },
                    {
                        id: 2,
                        text: "Learn Redux",
                        isCompleted: false,
                        createdAt: 1622514400000,
                    },
                    {
                        id: 3,
                        text: "Learn React Native",
                        isCompleted: false,
                        createdAt: 16548794225124,
                    } ],
                    isLoading: false,
                    isCreating: false,
                    isDeleting: false,
                }
            });
        })

        it("should try to create todo with existing text but it should fail and never add it to todos", async () => {
            const text = "Learn React";
            await store.dispatch(createTodoRequest({ text }));

            expect(store.getState().todos.todos.length).to.equal(3);
            expect(store.getState()).to.deep.equal({
                todos: {
                    todos: [ {
                        id: 1,
                        text: "Learn React",
                        isCompleted: false,
                        createdAt: 1601131200000,
                    },
                    {
                        id: 2,
                        text: "Learn Redux",
                        isCompleted: false,
                        createdAt: 1622514400000,
                    },
                    {
                        id: 3,
                        text: "Learn React Native",
                        isCompleted: false,
                        createdAt: 16548794225124,
                    } ],
                    isLoading: false,
                    isCreating: false,
                    isDeleting: false,
                }
            });
        })

        it("should delete a todo and remove it from the todos state", async () => {
            await store.dispatch(deleteTodoRequest({ id: 1 }));

            expect(store.getState().todos.todos.length).to.equal(2);
            expect(store.getState()).to.deep.equal({
                todos: {
                    todos: [ {
                        id: 2,
                        text: "Learn Redux",
                        isCompleted: false,
                        createdAt: 1622514400000,
                    },
                    {
                        id: 3,
                        text: "Learn React Native",
                        isCompleted: false,
                        createdAt: 16548794225124,
                    } ],
                    isLoading: false,
                    isCreating: false,
                    isDeleting: false,
                }
            });

        })
    })


    describe("The todos reducers" , () => {
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
            const action = removeTodo(testPayload);
            const expectedState = { ...state, todos: [] };
    
            expect(todosReducer(initialState, action)).to.deep.equal(expectedState);
        })
    
        it("Marks a todo as completed when 'todos/markTodoCompleted' action is dispatched", () => {
            const testTodo = { text: "Learn Redux", isCompleted: false, id: 1, createdAt: Date.now() }
            const initialState = { ...state, todos: [ { ...testTodo } ] };
            const testPayload = { id: 1 };
            const action = markTodoCompleted(testPayload);
            const expectedState = { ...state, todos: [ { ...testTodo, isCompleted: true } ] };
    
            expect(todosReducer(initialState, action)).to.deep.equal(expectedState);
        })
    })
})