import { useEffect, useRef, useState } from 'react';
import { animate, motion, stagger, AnimatePresence, spring } from 'framer-motion';
import './App.css';

function App() {
  const [todos, setTodos] = useState([{ title: 'as', isComplete: false }, { title: 'dfd', isComplete: false }])
  const [task, setTask] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [todoDelete, setTodoDelete] = useState(null)
  useEffect(() => { deleteTodo() }, [todoDelete])

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
    todos.map(todo => {
      if (todo.title === task) {
        sameValue = true
        alert('same')
      }
      return null
    })
    if (sameValue || task === '') {
      return
    }
    setTodos([{ title: task, isComplete: false }, ...todos])
    setTask('')
  }
  const deleteTodo = () => {
    //settodos start
    console.log(todoDelete)
    if (todoDelete && !todoDelete.isComplete) {
      setShowConfirm(true)
    } else {
      confirmDelete()
    }
  }
  const confirmDelete = () => {
    console.log('confirm delet', todoDelete)
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

          <input type='text' ref={userInput} className='input-tag but border-end-0' placeholder='Set a Task' onChange={(e) => setTask(e.target.value)} />
        </div>
        <motion.button
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.01 }}
          className='but border-start-0 icons' onClick={addTodo}>➡</motion.button>
      </motion.div>
      
      <div className='todo-container'>
        <ul className='todo-list '>
          <AnimatePresence>
            {todos.map((todo,i) =>
              <motion.li
                initial={{ opacity: 0,translateY:300,scale:0.1 }}
                animate={{ opacity: 1,translateY:0,scale:1}}
                exit={{opacity: 0,translateY:300,scale:0.1}}
                transition={{ duration:1,delay:i*0.2}}
                className='todo todo-create-animate' key={todo.title}>
                <span>{todo.title}</span>
                <div className='task-button'>
                  <button className='but icons' onClick={(e) => {
                    todo.isComplete = !todo.isComplete
                    e.target.parentElement.parentElement.classList.toggle('slashed-text')
                    console.log(todo)
                  }}
                    title='Finished'
                  >✔</button>
                  <button className='but icons' style={{ color: 'red' }} onClick={() => { setTodoDelete(todo) }}
                    title='Delete'> ➖</button>

                </div >
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
