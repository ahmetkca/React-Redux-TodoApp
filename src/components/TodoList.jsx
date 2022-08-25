import React from 'react'
import "../styles/TodoList.css";
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';


const TodoList = ({ todos = [{ text: 'Hello World!' }] }) => {
    return (
        <div className='list-wrapper'>
            <NewTodoForm />
            {todos.map(todo => (<TodoListItem todo={todo} />))}
        </div>
        )
}

export default TodoList;