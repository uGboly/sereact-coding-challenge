import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

let ws

// Initialize WebSocket connection
export const initWebSocket = createAsyncThunk(
  'sphere/initWebSocket',
  async (_, { dispatch }) => {
    return new Promise((resolve, reject) => {
      ws = new WebSocket('ws://localhost:4001')

      ws.onopen = () => {
        console.log('WebSocket connected')
        resolve()
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
export const setRadius = createAsyncThunk('sphere/setRadius', async radius => {
  return sendMessage('set_radius', { radius })
})

export const getRadius = createAsyncThunk('sphere/getRadius', async () => {
  return sendMessage('get_radius')
})

const sendMessage = (method, params = {}) => {
  return new Promise((resolve, reject) => {
    const id = method
    ws.send(JSON.stringify({ id, method, params }))
    const handler = event => {
      const response = JSON.parse(event.data)
      if (response.id === id) {
        ws.removeEventListener('message', handler)
        if (response.error) {
          reject(response.error)
        } else {
          resolve(response.result)
        }
      }
    }
    ws.addEventListener('message', handler)
  })
}

// Slice
const sphereSlice = createSlice({
  name: 'sphere',
  initialState: {
    radius: 1,
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
      .addCase(getRadius.fulfilled, (state, action) => {
        state.radius = action.payload
      })
  }
})

export default sphereSlice.reducer
