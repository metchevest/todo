import React, { useState, useRef, useEffect } from 'react';

import { TodoList } from './components/TodoList';
import './App.css';

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


    const [todos, setTodos] = useState(todoList);
    const [pokeApiData, setPokeApiData] = useState([]);

    const todoTaskRef = useRef();

    const handleTodoAdd = () => {
        const taskText = todoTaskRef.current.value;
        if (taskText === '') return;
        const newTodos = [...todos, { id: Date.now(), task: taskText, completed: false, urgent: false }]
        setTodos(newTodos);
        todoTaskRef.current.value = '';

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
        const taskFromStorage = JSON.parse(localStorage.getItem('tareas'));
        if (taskFromStorage) {
            setTodos(taskFromStorage)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(todos));
    }, [todos]);

    const callPokeApi = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/location/');
        const result = await response.json();
        return result;
    }

    useEffect(() => {

        async function fetchData() {
            const { results } = await callPokeApi();
            setPokeApiData(results);
        }

        fetchData();
    }, []);


    console.log('paso por el render', pokeApiData);
    return (
        <div className='app'>
            <h1> ToDo List </h1>
            <TodoList
                todos={todos}
                onToggleCompleted={onToggleCompleted}
                onDelete={onDelete} />
            <input ref={todoTaskRef} type="text" />
            <button onClick={handleTodoAdd}> Agregar tarea</button>

            <div>
                {pokeApiData.map(elem =>
                    <div className="pokeName" key={elem.url}>
                        {elem.name}
                    </div>)}
            </div>
        </div>);
}