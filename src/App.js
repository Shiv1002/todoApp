import {  useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([])
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
    console.log('confirm delet',todoDelete)
    setTodos(todos.filter(ele => {
      if (ele === todoDelete) {
        console.log("found a match",ele)
        return false
      } else {console.log(ele);return true}
    }))
  }
  useEffect(()=>{deleteTodo()},[todoDelete])

  
  return (
    <div className="App">
      <div className='user-input'>
        <div className='task-input'>
          <input type='text'  ref={userInput} className='input-tag but border-end-0' placeholder='Set a Task' onChange={(e) => setTask(e.target.value)} />
        </div>
        <button className='but border-start-0 icons' onClick={addTodo}>➡</button>
      </div>
      <div className='todo-container'>
        <ul className='todo-list '>
          {todos.map((todo) => <li className='todo todo-create-animate' key={todo.title}>
            <span>{todo.title}</span>
            <div  className='task-button'>
            <button className='but icons' onClick={(e) => {
              todo.isComplete = true
              e.target.parentElement.classList.toggle('slashed-text')
              console.log(todo)
            }}
            title='Finished'
            >✔</button>
            <button className='but icons' style={{color:'red'}} onClick={() => {       setTodoDelete(todo)  }}
            title='Delete'> ➖</button>
          
            </div >
            </li>)}
        </ul>
      </div>
      {
        showConfirm ? <> 
          <div className='confirmDelPop'>
            <span>Sure? It is not Completed</span>
            <div className='task-button'>
            <button style={{color:'white',backgroundColor:'red'}} className='but' onClick={() => { confirmDelete(); setShowConfirm(false) }}>Sure</button>
            <button style={{color:'white',backgroundColor:'rgb(0, 204, 255)'}} className='but' onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
            </div>
          <div className='overlay'>
          </div>
        </> : null
      }


    </div>
  );
}

export default App;
