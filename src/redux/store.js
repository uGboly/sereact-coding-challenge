import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import counter2Reducer from './counter2Slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    counter2: counter2Reducer
  }
})
