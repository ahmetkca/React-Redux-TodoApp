import React, { useEffect } from 'react'
import "../styles/TodoList.css";
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../features/todos/todosSlice';


const TodoList = () => {
    const dispatch = useDispatch();

    const { todos, isLoading, isCreating } = useSelector(state => state.todos);

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
                {todos.map(todo => (<TodoListItem key={todo.id} todo={todo} />))}
                {isCreating &&
                    <h2 align="center">New Todo Item is on the way...</h2>
                }
            </div>
        );
}

export default TodoList;