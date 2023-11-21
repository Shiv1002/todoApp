import React, { useMemo } from "react";
import TodoCard from "./TodoCard";
export default function TodoList({ todos, setTodos, setTodoDelete }) {
  return (
    <>
      {todos.map((todo, i) => (
        <>
          <TodoCard
            key={i}
            todos={todos}
            todo={todo}
            setTodos={setTodos}
            setTodoDelete={setTodoDelete}
          />
        </>
      ))}
    </>
  );
}
