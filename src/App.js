import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { animate, motion, AnimatePresence } from "framer-motion";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoCard from "./components/TodoCard";
var initialTask = { title: "", isComplete: false };

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [task, setTask] = useState(initialTask);
  const [showConfirm, setShowConfirm] = useState(false);
  const [todoDelete, setTodoDelete] = useState(null);

  useEffect(() => {
    deleteTodo();
  }, [todoDelete]);

  useEffect(() => {
    var stringifiedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", stringifiedTodos);
    console.log(JSON.parse(localStorage.getItem("todos")));
  }, [todos]);

  const confirmDelVarient = {
    hidden: {
      y: -1200,
    },
    show: showConfirm && {
      y: 0,
      scale: [2, 1],
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
  };

  const userInput = useRef(null);

  const shakeUserInput = () => {
    animate(".user-input", { x: [-5, 5, -5, 5, 0] }, { duration: 0.2 });
  };

  const errorOnInput = (msg) => {
    shakeUserInput();
    toast.error(msg, { duration: 1000 });
  };

  const addTodo = () => {
    if (task.title.length < 5) {
      errorOnInput("Minimum 5 letters!!");
      return;
    }
    userInput.current.value = "";
    // checke if task is null or wheather each value is equal to already listed task
    for (var todo of todos) {
      // console.log(todo)
      if (todo.title.toUpperCase() === task.title.toUpperCase()) {
        errorOnInput(`${task.title} is already in list`);
        return;
      }
    }
    // console.log(task.title.toCam())
    setTodos([task, ...todos]);
    setTask(initialTask);
  };
  const deleteTodo = () => {
    //settodos start
    // console.log(todoDelete)
    if (todoDelete && !todoDelete.isComplete) {
      setShowConfirm(true);
    } else {
      confirmDelete();
    }
  };
  const confirmDelete = () => {
    // console.log('confirm delet', todoDelete)
    if (todoDelete)
      setTodos(
        todos.filter((ele) => {
          if (ele === todoDelete) {
            console.log("found a match", ele);
            return false;
          } else {
            console.log(ele);
            return true;
          }
        })
      );
    else return;
    setTodoDelete(null);
  };

  return (
    <div className="App">
      <Toaster />
      <TodoInput
        userInput={userInput}
        task={task}
        setTask={setTask}
        AddTodo={addTodo}
      />
      <ul className="todo-list ">
        <AnimatePresence>
          {todos.map((todo, i) => (
            <TodoCard
              key={todo.title}
              todos={todos}
              todo={todo}
              setTodos={setTodos}
              setTodoDelete={setTodoDelete}
            />
          ))}
        </AnimatePresence>
      </ul>

      <motion.div
        variants={confirmDelVarient}
        initial="hidden"
        animate={"show"}
        className="confirmDelPop"
      >
        <span>Sure? It is not Completed</span>
        <div className="task-button">
          <button
            style={{ color: "white", backgroundColor: "red" }}
            className="but"
            onClick={() => {
              confirmDelete();
              setShowConfirm(false);
            }}
          >
            Sure
          </button>
          <button
            style={{ color: "white", backgroundColor: "rgb(0, 204, 255)" }}
            className="but"
            onClick={() => {
              setShowConfirm(false);
              setTodoDelete(null);
            }}
          >
            Cancel
          </button>
        </div>
      </motion.div>

      {showConfirm && <motion.div className="overlay"></motion.div>}
    </div>
  );
}

export default App;
