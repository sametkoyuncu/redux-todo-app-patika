import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos`)
    return await res.json()
  }
)

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (title) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
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
    addNewTodoIsLoading: false,
    addNewTodoError: null,
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
      state.addNewTodoIsLoading = true
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload)
      state.addNewTodoIsLoading = false
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoError = action.error.message
      state.addNewTodoIsLoading = false
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
