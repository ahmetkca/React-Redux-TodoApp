import React, { useRef } from "react";
import "../styles/NewTodoForm.css";

export const NewTodoForm = () => {

    const todoInputRef = useRef(null);

    return (
        <div className="new-todo-form">
            <input ref={todoInputRef} className="new-todo-input" type="text" placeholder="What needs to be done?" />
            <button className="new-todo-button">Add Todo</button>
        </div>
    );
}

export default NewTodoForm;