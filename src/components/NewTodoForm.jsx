import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoRequest } from "../features/todos/todosSlice";
import styled from "styled-components";

const NewTodoFormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewTodoFormInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewTodoFormButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

export const NewTodoForm = () => {

    const dispatch = useDispatch();
    const todoInputRef = useRef(null);
    const { isCreating } = useSelector(state => state.todos);

    return (
        <NewTodoFormContainer>
            <NewTodoFormInput 
                disabled={isCreating} 
                ref={todoInputRef} 
                className="new-todo-input" 
                type="text" 
                placeholder="What needs to be done?" />
            <NewTodoFormButton
                disabled={isCreating}
                className="new-todo-button"
                onClick={() => {
                    dispatch(createTodoRequest({ text: todoInputRef.current.value }));
                    todoInputRef.current.value = "";
                }}>{isCreating ? "Adding Todo..." : "Add Todo" }</NewTodoFormButton>
        </NewTodoFormContainer>
    );
}

export default NewTodoForm;