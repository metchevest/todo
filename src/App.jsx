import React, { useState, useRef } from 'react';

import { TodoList } from './components/TodoList';
import './App.css';

export const App = () => {

    const todoList = [
        {
            id: 1,
            task: "Comprar leche",
            completed: false,
        },
        {
            id: 2,
            task: "Ir al dentista",
            completed: false,
        },
        {
            id: 3,
            task: "Hacer ej de mumuki",
            completed: true,
        },
        {
            id: 4,
            task: "Aprender React",
            completed: false,
        }
    ];

    const [todos, setTodos] = useState(todoList);

    const todoTaskRef = useRef();

    const handleTodoAdd = () => {
        const taskText = todoTaskRef.current.value;
        if (taskText === '') return;
        setTodos(prevTodos => [...prevTodos, { id: Date.now(), task: taskText, completed: false }])
        todoTaskRef.current.value = '';
    }

    const onToggleCompleted = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const onDelete = (id) =>
        setTodos(prev => prev.filter(elem => elem.id != id))

    return (<div className='app'>
        <h1>ToDo List</h1>
        <TodoList todos={todos} onToggleCompleted={onToggleCompleted} onDelete={onDelete} />
        <input ref={todoTaskRef} type="text" />
        <button onClick={handleTodoAdd}> Agregar tarea</button>
    </div>);
}