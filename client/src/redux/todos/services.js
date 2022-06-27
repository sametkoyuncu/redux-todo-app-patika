import { createAsyncThunk } from '@reduxjs/toolkit'

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

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodoAsync',
  async ({ id, data }) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/todos/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    return await res.json()
  }
)

export const removeTodoAsync = createAsyncThunk(
  'todos/removeTodoAsync',
  async (id) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/todos/${id}`,
      {
        method: 'DELETE',
      }
    )
    return id
  }
)

export const removeCompletedTodosAsync = createAsyncThunk(
  'todos/removeCompletedTodosAsync',
  async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/todos/clearCompleted`,
      {
        method: 'DELETE',
      }
    )
    return await res.json()
  }
)
