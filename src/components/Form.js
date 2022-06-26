import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/todos/todosSlice'

const Form = () => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title) return
    dispatch(addTodo({ title }))
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  )
}

export default Form
