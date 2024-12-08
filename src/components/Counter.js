import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../redux/counterSlice'

function Counter () {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className='p-4 bg-white rounded shadow-md'>
      <h1 className='text-2xl font-bold'>Counter: {count}</h1>
      <div className='mt-4 space-x-2'>
        <button onClick={() => dispatch(increment())} className='btn'>
          Increment
        </button>
        <button onClick={() => dispatch(decrement())} className='btn'>
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter
