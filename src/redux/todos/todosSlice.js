import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [
      { id: 1, title: 'Learn JavaScript', completed: true },
      { id: 2, title: 'Learn React', completed: false },
      { id: 3, title: 'Have a life!', completed: false },
    ],
    activeFilter: 'all',
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload)
    },
    toggle: (state, action) => {
      state.items[action.payload.index].completed = action.payload.completed
    },
    destroy: (state, action) => {
      const id = action.payload
      const filtered = state.items.filter((item) => item.id !== id)
      state.items = filtered
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => !item.completed)
      state.items = filtered
    },
  }, // reducers is an object with the same name as the slice
})

export const selectTodos = (state) => state.todos.items
// is this necessary? think about it before you use it
export const selectFilteredTodos = (state) => {
  const items = state.todos.items
  const activeFilter = state.todos.activeFilter
  let filtered
  switch (activeFilter) {
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
  return filtered
}

export const { addTodo, toggle, destroy, setActiveFilter, clearCompleted } =
  todosSlice.actions // actions is an object with the same name as the slice
export default todosSlice.reducer
