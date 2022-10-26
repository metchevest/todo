import React from 'react';

import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, onToggleCompleted, onDelete }) => {
    return (
        <ul>
            {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        item={todo}
                        onToggleCompleted={onToggleCompleted}
                        onDelete={onDelete} />
                )
                )}
        </ul>
    );
}



