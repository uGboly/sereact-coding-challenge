import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  incrementAsync,
  decrementAsync,
  fetchCounter
} from '../redux/counter2Slice'

function Counter2 () {
  const count = useSelector(state => state.counter2.value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCounter()) // Fetch initial counter value
  }, [dispatch])

  return (
    <div className='p-4 bg-white rounded shadow-md'>
      <h1 className='text-2xl font-bold'>Counter2: {count}</h1>
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

export default Counter2
