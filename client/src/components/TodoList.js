import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import Error from './Error'
import {
  toggle,
  destroy,
  selectFilteredTodos,
  getTodosAsync,
} from '../redux/todos/todosSlice'

const TodoList = () => {
  const filteredTodos = useSelector(selectFilteredTodos)
  const isLoading = useSelector((state) => state.todos.isLoading)
  const error = useSelector((state) => state.todos.error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodosAsync())
  }, [dispatch])

  const handleDestroy = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(destroy(id))
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} />
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => {
                dispatch(
                  toggle({
                    index: filteredTodos.indexOf(item),
                    completed: !item.completed,
                  })
                )
              }}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
