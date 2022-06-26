import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const res = await fetch('http://localhost:7000/todos')
    return await res.json()
  }
)

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: 'all',
  },
  reducers: {
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
      console.log(action.error)
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
