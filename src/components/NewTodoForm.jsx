import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoRequest } from "../features/todos/todosSlice";
import "../styles/NewTodoForm.css";

export const NewTodoForm = () => {

    const dispatch = useDispatch();
    const todoInputRef = useRef(null);
    const { isCreating } = useSelector(state => state.todos);

    return (
        <div className="new-todo-form">
            <input disabled={isCreating} ref={todoInputRef} className="new-todo-input" type="text" placeholder="What needs to be done?" />
            <button
                disabled={isCreating}
                className="new-todo-button"
                onClick={() => {
                    dispatch(createTodoRequest({ text: todoInputRef.current.value }));
                    todoInputRef.current.value = "";
                }}>{isCreating ? "Adding Todo..." : "Add Todo" }</button>
        </div>
    );
}

export default NewTodoForm;