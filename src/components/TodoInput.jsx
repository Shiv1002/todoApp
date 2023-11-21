import React from 'react'
import {motion} from 'framer-motion'

export default function TodoInput({userInput,task,setTask,AddTodo}) {
  return (
    <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}

        className='user-input'>
        <div className='task-input'>

          <input id='inputField' type='text' ref={userInput} className='input-tag but border-end-0' placeholder='Set a Task'
            onChange={(e) => { setTask({ ...task, title: e.target.value }) }}
            onKeyDownCapture={(e) => { if (e.key === 'Enter') { AddTodo() } }}
            autoComplete='off'
            maxLength="50"
            minLength="5"
          />
        </div>
        <motion.button
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.01 }}
          className='but border-start-0 icons' onClick={AddTodo}>➡</motion.button>
      </motion.div>

  )
}
