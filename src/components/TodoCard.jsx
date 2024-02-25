import React from "react";
import { motion } from "framer-motion";
import TrashIcon from "../layout/trash";
import CompleteIcon from "../layout/complete";
export default function TodoCard({ todo, setTodos, setTodoDelete }) {
  const o = { initial: { y: 100, scale: 0.1 } };

  return (
    <motion.div
      initial={{ y: 100, scale: 0.1 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ scale: 1.2, x: [0, 0, 0, 0, -1000] }}
      transition={{ duration: 0.8, times: [0, 0.2, 0.3, 0.9, 1] }}
      iscomplete={todo.isComplete.toString()}
      className="todo"
    >
      <div className="todo-container">
        <button
          className="but icons"
          onClick={(e) => {
            todo.isComplete = !todo.isComplete;
            // console.log(todo);
            setTodos((todos) => [...todos]);
          }}
          title="Finished"
        >
          <CompleteIcon />
        </button>
        <span>{todo.title}</span>
        <div className="task-button">
          <button
            className="but icons"
            style={{ color: "red" }}
            onClick={() => {
              setTodoDelete(todo);
            }}
            title="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
