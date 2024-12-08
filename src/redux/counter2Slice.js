import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = 'http://localhost:4000/json-rpc'

// Thunks for backend communication
export const incrementAsync = createAsyncThunk(
  'counter2/increment',
  async () => {
    const response = await axios.post(apiUrl, { method: 'increment' })
    return response.data.result
  }
)

export const decrementAsync = createAsyncThunk(
  'counter2/decrement',
  async () => {
    const response = await axios.post(apiUrl, { method: 'decrement' })
    return response.data.result
  }
)

export const fetchCounter = createAsyncThunk('counter2/fetch', async () => {
  const response = await axios.post(apiUrl, { method: 'getCounter' })
  return response.data.result
})

// Slice
const counter2Slice = createSlice({
  name: 'counter2',
  initialState: {
    value: 0,
    status: 'idle'
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.value = action.payload
      })
      .addCase(decrementAsync.fulfilled, (state, action) => {
        state.value = action.payload
      })
      .addCase(fetchCounter.fulfilled, (state, action) => {
        state.value = action.payload
      })
  }
})

export default counter2Slice.reducer
