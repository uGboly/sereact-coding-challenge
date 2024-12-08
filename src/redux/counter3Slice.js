import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

let ws

// Initialize WebSocket connection
export const initWebSocket = createAsyncThunk(
  'counter3/initWebSocket',
  async (_, { dispatch }) => {
    return new Promise((resolve, reject) => {
      ws = new WebSocket('ws://localhost:4001')

      ws.onopen = () => {
        console.log('WebSocket connected')
        resolve()
      }

      ws.onmessage = event => {
        const { id, result } = JSON.parse(event.data)
        dispatch({ type: `counter3/${id}`, payload: result })
      }

      ws.onerror = err => {
        console.error('WebSocket error', err)
        reject(err)
      }

      ws.onclose = () => {
        console.log('WebSocket closed')
      }
    })
  }
)

// Thunks for WebSocket communication
export const incrementAsync = createAsyncThunk(
  'counter3/increment',
  async () => {
    return sendMessage('increment')
  }
)

export const decrementAsync = createAsyncThunk(
  'counter3/decrement',
  async () => {
    return sendMessage('decrement')
  }
)

export const fetchCounter = createAsyncThunk('counter3/fetch', async () => {
  return sendMessage('getCounter')
})

const sendMessage = method => {
  return new Promise((resolve, reject) => {
    const id = method
    ws.send(JSON.stringify({ id, method }))
    const handler = event => {
      const response = JSON.parse(event.data)
      if (response.id === id) {
        ws.removeEventListener('message', handler)
        resolve(response.result)
      }
    }
    ws.addEventListener('message', handler)
  })
}

// Slice
const counter3Slice = createSlice({
  name: 'counter3',
  initialState: {
    value: 0,
    status: 'idle'
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initWebSocket.fulfilled, state => {
        state.status = 'connected'
      })
      .addCase(initWebSocket.rejected, state => {
        state.status = 'disconnected'
      })
      .addCase(fetchCounter.fulfilled, (state, action) => {
        state.value = action.payload
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.value = action.payload
      })
      .addCase(decrementAsync.fulfilled, (state, action) => {
        state.value = action.payload
      })
  }
})

export default counter3Slice.reducer
