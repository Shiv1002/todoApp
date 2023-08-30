import { useEffect, useRef, useState } from 'react';
import { animate, motion, AnimatePresence } from 'framer-motion';
import './App.css';
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
    var sameValue = false
    userInput.current.value = ''
    // checke if task is null or wheather each value is equal to already listed task
    for (var todo of todos) {
      console.log(todo)
      if ((todo.title === task.title) || (sameValue || task.title === '')) {
        sameValue = true
        console.log(sameValue)
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

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}

        className='user-input'>
        <div className='task-input'>

          <input id='inputField' type='text' ref={userInput} className='input-tag but border-end-0' placeholder='Set a Task'
            onChange={(e) => { setTask({ ...task, title: e.target.value }) }}
            onKeyDownCapture={(e) => { if (e.key === 'Enter') { addTodo() } }}
            autoComplete='off'
            maxLength="50"
          />
        </div>
        <motion.button
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.01 }}
          className='but border-start-0 icons' onClick={addTodo}>➡</motion.button>
      </motion.div>

      <div className=''>
        <ul className='todo-list '>
          <AnimatePresence >
            {todos.map((todo, i) =>
              <motion.li
                layout
                initial={{ y: 100, scale: 0.1 }}
                animate={{ y: 0, opacity: 1, scale: 1, }}
                exit={{ scale: 1.2, x: [0, 0, 0, 0, -1000] }}
                transition={{ duration: 0.8, times: [0, 0.2, 0.3, 0.9, 1] }}
                iscomplete={todo.isComplete.toString()}
                className='todo' key={todo.title}
              >
                <div className='todo-container'>
                  <span>{todo.title}</span>
                  <div className='task-button'>
                    <button className='but icons' onClick={(e) => {
                      todo.isComplete = !todo.isComplete
                      setTodos([...todos])
                    }}
                      title='Finished'
                    >✔</button>
                    <button className='but icons' style={{ color: 'red' }} onClick={() => { setTodoDelete(todo) }}
                      title='Delete'> ➖</button>
                  </div >
                </div>


              </motion.li>)}
          </AnimatePresence>

        </ul>
      </div>
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
