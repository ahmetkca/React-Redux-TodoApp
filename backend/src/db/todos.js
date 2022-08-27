import crypto from 'crypto';

let todos = [

];

export const getTodos = () => {
    return todos;
}

export const getTodoById = (id) => {
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        throw new Error("Todo not found");
    }

    return todo;
}

export const createTodo = ({ text }) => {
    const uid = crypto.randomUUID({ disableEntropyCache: true, randomLength: 16 });

    if (todos.some(todo => todo.text === text)) {
        throw new Error("Todo already exists");
    }

    const todo = {
        id: uid,
        text,
        isCompleted: false,
        createdAt: Date.now(),
    };
    todos = [...todos, { ...todo }];
    return todo;
}

export const markTodoAsComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        throw new Error("Todo not found");
    }

    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.isCompleted = true;
        }
        return todo;
    });
    return todos.find(todo => todo.id === id);
}

export const deleteTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        throw new Error("Todo not found");
    }

    todos = todos.filter(todo => todo.id !== id);
    return todo;
}