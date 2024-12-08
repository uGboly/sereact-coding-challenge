import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  incrementAsync,
  decrementAsync,
  fetchCounter,
  initWebSocket
} from '../redux/counter3Slice'

function Counter3 () {
  const count = useSelector(state => state.counter3.value)
  const status = useSelector(state => state.counter3.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initWebSocket())
      .then(() => {
        dispatch(fetchCounter())
      })
      .catch(() => {
        console.error('Failed to connect to WebSocket')
      })
  }, [dispatch])

  if (status === 'disconnected') {
    return <p>Unable to connect to the WebSocket server.</p>
  }

  return (
    <div className='p-4 bg-white rounded shadow-md'>
      <h1 className='text-2xl font-bold'>WebSocket Counter: {count}</h1>
      <div className='mt-4 space-x-2'>
        <button onClick={() => dispatch(incrementAsync())} className='btn'>
          Increment
        </button>
        <button onClick={() => dispatch(decrementAsync())} className='btn'>
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter3
