import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
    return (
        <>
            {todos
                .map((todo, i) => (
                    <Todo
                        key={i}
                        todo={todo}
                        deleteTodo={deleteTodo}
                        completeTodo={completeTodo}
                    />
                ))
                .reduce((acc, cur) => [...acc, <hr />, cur], [])}
        </>
    );
};

export default TodoList;
