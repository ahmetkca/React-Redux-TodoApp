import React from 'react'
import "../styles/TodoList.css";
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { useSelector } from 'react-redux';


const TodoList = (/*{ todos = [{ text: 'Hello World!' }] }*/) => {

    const { todos } = useSelector(state => state.todos);

    return (
        <div className='list-wrapper'>
            <NewTodoForm />
            {todos.map(todo => (<TodoListItem key={todo.id} todo={todo} />))}
        </div>
        )
}

export default TodoList;