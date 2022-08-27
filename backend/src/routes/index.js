import { getAllTodosRoute } from "./getAllTodosRoute";
import { getTodoByIdRoute } from "./getTodoByIdRoute";
import { createTodoRoute } from "./createTodoRoute";
import { markTodoAsCompleteRoute } from "./markTodoAsCompleteRoute";
import { deleteTodoRoute } from "./deleteTodoRoute";

export const routes = [
    getAllTodosRoute,
    getTodoByIdRoute,
    createTodoRoute,
    markTodoAsCompleteRoute,
    deleteTodoRoute
];
