import React, { useEffect } from 'react'
import "../styles/TodoList.css";
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../features/todos/todosSlice';


const TodoList = () => {
    const dispatch = useDispatch();

    const { todos, isLoading } = useSelector(state => state.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    } , []);


    return isLoading ? (
            <div> Todos Loading... </div> 
        ) : (
            <div className='list-wrapper'>
                <NewTodoForm />
                {todos.map(todo => (<TodoListItem key={todo.id} todo={todo} />))}
            </div>
        );
}

export default TodoList;