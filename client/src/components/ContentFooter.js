import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveFilter, selectTodos } from '../redux/todos/todosSlice'
import { removeCompletedTodosAsync } from '../redux/todos/services'

const ContentFooter = () => {
  const items = useSelector(selectTodos)
  const itemsLeft = items.filter((item) => !item.completed).length

  const activeFilter = useSelector((state) => state.todos.activeFilter)

  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('activeFilter', activeFilter)
  }, [activeFilter])

  const handleClick = (state) => {
    dispatch(setActiveFilter(state))
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>
          {itemsLeft === 0
            ? 'No items left'
            : itemsLeft === 1
            ? `${itemsLeft} item left`
            : `${itemsLeft} items left`}
        </strong>
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === 'all' ? 'selected' : ''}
            onClick={() => handleClick('all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === 'active' ? 'selected' : ''}
            onClick={() => handleClick('active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === 'completed' ? 'selected' : ''}
            onClick={() => handleClick('completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() => dispatch(removeCompletedTodosAsync())}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default ContentFooter
