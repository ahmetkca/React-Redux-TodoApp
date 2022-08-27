import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";
import "../styles/NewTodoForm.css";

export const NewTodoForm = () => {

    const dispatch = useDispatch();
    const todoInputRef = useRef(null);

    return (
        <div className="new-todo-form">
            <input ref={todoInputRef} className="new-todo-input" type="text" placeholder="What needs to be done?" />
            <button 
                className="new-todo-button"
                onClick={() => {
                    console.log(todoInputRef.current.value);
                    dispatch(addTodo({ text: todoInputRef.current.value }));
                    todoInputRef.current.value = "";
                }}>Add Todo</button>
        </div>
    );
}

export default NewTodoForm;