import React from "react";
import "../styles/TodoListItem.css";
import { useDispatch } from "react-redux";
import { markTodoCompleted } from "../features/todosSlice";
import { markTodoUncompleted } from "../features/todosSlice";
import { removeTodo } from "../features/todosSlice";

export const TodoListItem = ({ todo }) => {

    const dispatch = useDispatch();

    return (
        <div className="todo-item-container">
            <h3>{todo.text}</h3>
            <p>{todo.isCompleted ? "Completed" : "Uncompleted" }</p>
            <div className="buttons-container">
                <button 
                    className="completed-button"
                    onClick={() => 
                        dispatch(markTodoCompleted({ id: todo.id }))
                    }>
                    Mark as Completed
                </button>
                <button 
                    className="remove-button"
                    onClick={() =>
                        dispatch(removeTodo({ id: todo.id }))
                    }>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default TodoListItem;