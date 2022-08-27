import React from "react";
import "../styles/TodoListItem.css";
import { useDispatch, useSelector } from "react-redux";
import { markTodoAsCompleteRequest } from "../features/todos/todosSlice";
import { deleteTodoRequest } from "../features/todos/todosSlice";

export const TodoListItem = ({ todo }) => {

    const dispatch = useDispatch();
    const { isDeleting } = useSelector(state => state.todos);

    return (
        <div className="todo-item-container">
            <h3>{todo.text}</h3>
            <p>{todo.isCompleted ? "Completed" : "Uncompleted" }</p>
            <div className="buttons-container">
                {!todo.isCompleted && (
                    <button 
                    className="completed-button"
                    onClick={() => 
                        dispatch(markTodoAsCompleteRequest({ id: todo.id }))
                    }>
                    Mark as Completed
                </button>)}
                
                <button 
                    disabled={isDeleting}
                    className="remove-button"
                    onClick={() =>
                        dispatch(deleteTodoRequest({ id: todo.id }))
                    }>
                    {isDeleting ? "Removing Todo..." : "Remove Todo" }
                </button>
            </div>
        </div>
    )
}

export default TodoListItem;