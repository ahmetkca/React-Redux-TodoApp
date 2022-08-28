import React, { useEffect } from 'react'
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../features/todos/todosSlice';
import { FilterBy } from './FilterBy';
import { selectTodosBasedOnFilterBy } from '../features/selectors';

import styled from 'styled-components';

const TodoListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = () => {
    const dispatch = useDispatch();

    const { isLoading, isCreating } = useSelector(state => state.todos);

    const filteredTodos = useSelector(selectTodosBasedOnFilterBy);

    useEffect(() => {
        dispatch(fetchTodos());
    } , []);


    return isLoading ? (
            <TodoListWrapper>
                <NewTodoForm />
                <div>
                    <h2 align='center'>Todos Loading...</h2>
                </div> 
            </TodoListWrapper>
        ) : (
            <TodoListWrapper>
                <NewTodoForm />
                <FilterBy />
                {filteredTodos.map(todo => (<TodoListItem key={todo.id} todo={todo} />))}
                {isCreating &&
                    <h2 align="center">New Todo Item is on the way...</h2>
                }
            </TodoListWrapper>
        );
}

export default TodoList;