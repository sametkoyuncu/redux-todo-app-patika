import { createSlice } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [
      { id: 1, title: 'Learn JavaScript', completed: true },
      { id: 2, title: 'Learn React', completed: false },
      { id: 3, title: 'Have a life!', completed: false },
    ],
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
  }, // reducers is an object with the same name as the slice
})

export const { addTodo, toggle, destroy } = todosSlice.actions // actions is an object with the same name as the slice
export default todosSlice.reducer
