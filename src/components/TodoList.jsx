import React, { useEffect } from 'react'
import "../styles/TodoList.css";
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../features/todos/todosSlice';
import { FilterBy } from './FilterBy';
import { selectTodosBasedOnFilterBy } from '../features/selectors';


const TodoList = () => {
    const dispatch = useDispatch();

    const { todos, isLoading, isCreating } = useSelector(state => state.todos);

    const filteredTodos = useSelector(selectTodosBasedOnFilterBy);

    useEffect(() => {
        dispatch(fetchTodos());
    } , []);


    return isLoading ? (
            <div className='list-wrapper'>
                <NewTodoForm />
                <div>
                    <h2 align='center'>Todos Loading...</h2>
                </div> 
            </div>
        ) : (
            <div className='list-wrapper'>
                <NewTodoForm />
                <FilterBy />
                {filteredTodos.map(todo => (<TodoListItem key={todo.id} todo={todo} />))}
                {isCreating &&
                    <h2 align="center">New Todo Item is on the way...</h2>
                }
            </div>
        );
}

export default TodoList;