import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { toggle, destroy } from '../redux/todos/todosSlice'

const TodoList = () => {
  const items = useSelector((state) => state.todos.items)
  const activeFilter = useSelector((state) => state.todos.activeFilter)
  const dispatch = useDispatch()

  let filtered

  const handleDestroy = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(destroy(id))
    }
  }

  switch (activeFilter) {
    case 'all':
      filtered = items
      break
    case 'active':
      filtered = items.filter((item) => !item.completed)
      break
    case 'completed':
      filtered = items.filter((item) => item.completed)
      break
    default:
      filtered = items
      break
  }

  return (
    <ul className="todo-list">
      {filtered.map((item) => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => {
                dispatch(
                  toggle({
                    index: items.indexOf(item),
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
