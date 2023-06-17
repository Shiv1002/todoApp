import {  useRef, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([{ title: 'kl', isComplete: false }])
  const [task, setTask] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [todoDelete, setTodoDelete] = useState(null)
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
  }
  const deleteTodo = () => {
    //settodos start
    if (todoDelete && !todoDelete.isComplete) {
      setShowConfirm(true)
    } else {
      confirmDelete(todoDelete)
    }

  }
  const confirmDelete = () => {
    setTodos(todos.filter(ele => {
      if (ele === todoDelete) {
        console.log(ele)
        return false
      } else return true
    }))
  }
  return (
    <div className="App">
      <div className='user-input'>
        <div className='task-input'>
          <input type='text' ref={userInput} placeholder='Set a ToDo' onChange={(e) => setTask(e.target.value)} />
        </div>
        <button onClick={addTodo}>Add</button>
      </div>
      <div className='todo-container'>
        <ul className='todo-list'>
          {todos.map((todo) => <li className='todo' key={todo.title}>
            <span>{todo.title}</span>
            <button onClick={(e) => {
              todo.isComplete = true
              e.target.parentElement.classList.toggle('slashed-text')
            }
            }>Done</button>
            <button onClick={() => { setTodoDelete(todo); deleteTodo() }}>Delete</button>
          </li>)}
        </ul>
      </div>
      {
        showConfirm ? <>
          <div className='confirmDelPop'>
            <span>Are you sure to delete?</span>
            <button onClick={() => { confirmDelete(); setShowConfirm(false) }}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
          <div className='overlay'>
          </div>
        </> : null
      }


    </div>
  );
}

export default App;
