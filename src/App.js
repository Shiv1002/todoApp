import { useEffect, useRef, useState } from 'react';
import { animate, motion } from 'framer-motion';
import './App.css';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
var initialTask = { title: '', isComplete: false }
function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
  const [task, setTask] = useState(initialTask)
  const [showConfirm, setShowConfirm] = useState(false)
  const [todoDelete, setTodoDelete] = useState(null)

  useEffect(() => {
    deleteTodo()
  }, [todoDelete])

  useEffect(() => {
    var stringifiedTodos = JSON.stringify(todos)
    localStorage.setItem('todos', stringifiedTodos)
    console.log(JSON.parse(localStorage.getItem('todos')))
  }, [todos])



  const confirmDelVarient = {
    hidden: {
      y: -1200
    },
    show: showConfirm && {
      y: 0,
      scale: [2, 1],
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    }
  }

  const userInput = useRef(null)
 
  const addTodo = () => {

    userInput.current.value = ''
    // checke if task is null or wheather each value is equal to already listed task
    for (var todo of todos) {

      console.log(todo)
      if ((todo.title === task.title)) {
        animate('.user-input', { x: [-5, 5, -5, 5, 0] }, { duration: 0.2 })
        return
      }
    }

    setTodos([task, ...todos])
    setTask(initialTask)
  }
  const deleteTodo = () => {
    //settodos start
    // console.log(todoDelete)
    if (todoDelete && !todoDelete.isComplete) {
      setShowConfirm(true)
    } else {
      confirmDelete()
    }
  }
  const confirmDelete = () => {
    // console.log('confirm delet', todoDelete)
    if (todoDelete)
      setTodos(todos.filter(ele => {
        if (ele === todoDelete) {
          console.log("found a match", ele)
          return false
        } else { console.log(ele); return true }
      }))
    else return
    setTodoDelete(null)

  }



  return (
    <div className="App">

      <TodoInput userInput={userInput} task={task} setTask={setTask} AddTodo={addTodo}/>
      <TodoList todos={todos} setTodos={setTodos} setTodoDelete={setTodoDelete} />


      <motion.div
        variants={confirmDelVarient}
        initial="hidden"
        animate={"show"}

        className='confirmDelPop'>
        <span>Sure? It is not Completed</span>
        <div className='task-button'>
          <button style={{ color: 'white', backgroundColor: 'red' }} className='but' onClick={() => { confirmDelete(); setShowConfirm(false) }}>Sure</button>
          <button style={{ color: 'white', backgroundColor: 'rgb(0, 204, 255)' }} className='but' onClick={() => { setShowConfirm(false); setTodoDelete(null) }}>Cancel</button>
        </div>
      </motion.div>
      {
        showConfirm && <motion.div className='overlay'></motion.div>
      }
    </div>
  );
}

export default App;
