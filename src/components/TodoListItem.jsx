import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { markTodoAsCompleteRequest } from "../features/todos/todosSlice";
import { deleteTodoRequest } from "../features/todos/todosSlice";
import styled from "styled-components";

const TodoListItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

const TodoListButtonsContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const TodoListItemButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
`;

const TodoListItemCompleteButton = styled(TodoListItemButton)`
    display: inline-block;
    background-color: #22ee22;
`;

const TodoListItemRemoveButton = styled(TodoListItemButton)`
    display: inline-block;
    background-color: #ee2222;
    margin-left: 8px;
`;

export const TodoListItem = ({ todo }) => {

    const dispatch = useDispatch();
    const { isDeleting } = useSelector(state => state.todos);

    return (
        <TodoListItemContainer>
            <h3>{todo.text}</h3>
            <p>{todo.isCompleted ? "Completed" : "Uncompleted" }</p>
            <p>
                Created at:&nbsp;
                {(new Date(todo.createdAt)).toLocaleString()}
            </p>
            <TodoListButtonsContainer>
                {!todo.isCompleted && (
                    <TodoListItemCompleteButton 
                        className="completed-button"
                        onClick={() => 
                            dispatch(markTodoAsCompleteRequest({ id: todo.id }))
                        }>
                        Mark as Completed
                    </TodoListItemCompleteButton>)}
                <TodoListItemRemoveButton 
                    disabled={isDeleting}
                    className="remove-button"
                    onClick={() =>
                        dispatch(deleteTodoRequest({ id: todo.id }))
                    }>
                    {isDeleting ? "Removing Todo..." : "Remove Todo" }
                </TodoListItemRemoveButton>
            </TodoListButtonsContainer>
        </TodoListItemContainer>
    )
}

export default TodoListItem;