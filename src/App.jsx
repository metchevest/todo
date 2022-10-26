import React, { useState, useRef, useEffect } from 'react';

import { TodoList } from './components/TodoList';
import './App.css';
import { hasPointerEvents } from '@testing-library/user-event/dist/utils';

export const App = () => {

    const todoList = [
        {
            id: 1,
            task: "Comprar leche",
            completed: false,
            urgent: true,
        },
        {
            id: 2,
            task: "Ir al dentista",
            completed: false,
            urgent: false,
        },
        {
            id: 3,
            task: "Hacer ej de mumuki",
            completed: true,
            urgent: true,
        },
        {
            id: 4,
            task: "Aprender React",
            completed: false,
            urgent: true,
        }
    ];


    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || todoList);

    const todoTaskRef = useRef();

    const handleTodoAdd = () => {
        const taskText = todoTaskRef.current.value;
        if (taskText === '') return;
        const newTodos = [...todos, { id: Date.now(), task: taskText, completed: false, urgent: false }]
        setTodos(newTodos);
        todoTaskRef.current.value = '';
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const onToggleCompleted = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const onDelete = (id) => {
        const newTodos = todos.filter(elem => elem.id != id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    useEffect(() => {
        console.log('estoy ejecutando el efecto ahora');
    }, []);

    console.log('paso por el render');
    return (
        <div className='app'>
            <h1> ToDo List </h1>
            <TodoList
                todos={todos}
                onToggleCompleted={onToggleCompleted}
                onDelete={onDelete} />
            <input ref={todoTaskRef} type="text" />
            <button onClick={handleTodoAdd}> Agregar tarea</button>
        </div>);
}