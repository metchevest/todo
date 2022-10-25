import React from 'react';

export const TodoItem = ({ item, onToggleCompleted, onDelete }) => {

    return (
        <li
            key={item.id}
            className={item.completed ? "completed" : "notCompleted"}>
            {item.task}
            <button className="delete-btn" onClick={() => onDelete(item.id)}>X</button>
            <button className="toggle-btn" onClick={() => onToggleCompleted(item.id)}> Hecho</button>
        </li >
    );
}