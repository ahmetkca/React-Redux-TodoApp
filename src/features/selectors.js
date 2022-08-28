import { createSelector } from "@reduxjs/toolkit";

const selectAllTodos = state => state.todos.todos;

const selectFilterBy = state => state.filterBy.filterBy;

const selectCompletedTodos = createSelector(
    selectAllTodos,
    (todos) => todos.filter(todo => todo.isCompleted)
);

const selectUncompletedTodos = createSelector(
    selectAllTodos,
    (todos) => todos.filter(todo => !todo.isCompleted)
);

const selectTodosBasedOnFilterBy = createSelector(
    selectAllTodos,
    selectFilterBy,
    (todos, filterBy) => {
        switch (filterBy) {
            case "all":
                return todos;
            case "completed":
                return todos.filter(todo => todo.isCompleted);
            case "uncompleted":
                return todos.filter(todo => !todo.isCompleted);
            default:
                return todos;
        }
    }
);

export { selectAllTodos, selectFilterBy, selectCompletedTodos, selectTodosBasedOnFilterBy };
