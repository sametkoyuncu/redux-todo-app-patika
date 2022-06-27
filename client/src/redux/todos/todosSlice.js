import { createSlice, nanoid } from '@reduxjs/toolkit'

import {
  getTodosAsync,
  addTodoAsync,
  toggleTodoAsync,
  removeTodoAsync,
  removeCompletedTodosAsync,
} from './services'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem('activeFilter') || 'all',
    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    //todo: we don't need this because we are using the addTodoAsync thunk fro api call but we can use this if we want to add todos to the state
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload)
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title,
          },
        }
      },
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
  extraReducers: {
    // get todos
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload
      state.isLoading = false
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.error = action.error.message
      state.isLoading = false
    },
    // add todo
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload)
      state.addNewTodo.isLoading = false
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.error = action.error.message
      state.addNewTodo.isLoading = false
    },
    // toogle todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload
      const index = state.items.findIndex((item) => item.id === id)
      state.items[index].completed = completed
    },
    // delete todo
    [removeTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload
      const index = state.items.findIndex((item) => item.id === id)
      state.items.splice(index, 1)
    },
    // delete all todos
    [removeCompletedTodosAsync.fulfilled]: (state, action) => {
      state.items = state.items.filter((item) => !item.completed)
    },
  },
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
