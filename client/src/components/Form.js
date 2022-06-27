import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addTodoAsync } from '../redux/todos/services'
import Loading from './Loading'
import Error from './Error'

const Form = () => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const addNewTodoIsLoading = useSelector(
    (state) => state.todos.addNewTodo.isLoading
  )
  const addNewTodoError = useSelector((state) => state.todos.addNewTodo.error)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title) return
    await dispatch(addTodoAsync(title))
    setTitle('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <input
        className="new-todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
        disabled={addNewTodoIsLoading}
      />

      {addNewTodoIsLoading && <Loading />}
      {addNewTodoError && <Error message={addNewTodoError} />}
    </form>
  )
}

export default Form
