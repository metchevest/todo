import React from 'react';

export const TodoItem = ({ item, onToggleCompleted, onDelete }) => {

    const handleInputClick = () => {
        onToggleCompleted(item.id);
    }

    return (
        <li
            className={item.completed ? "completed" : "notCompleted"}>
            {item.task}
            <button
                className="delete-btn"
                onClick={() => onDelete(item.id)}>X</button>
            <input
                type="checkbox"
                checked={item.completed}
                onChange={handleInputClick}
            />
        </li>
    );
}

/* onChange={() => onToggleCompleted(item.id)} */