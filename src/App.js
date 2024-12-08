import React from 'react'
import Counter from './components/Counter'
import Counter2 from './components/Counter2'
import Counter3 from './components/Counter3'
import Sphere from './components/Sphere'

function App () {
  return (
    <div className='min-h-screen bg-gray-100 p-6 flex'>
      <div className='w-1/3 bg-white p-4 rounded-lg shadow-md space-y-4'>
        <h1 className='text-xl font-bold text-center'>Counters</h1>
        <Counter />
        <Counter2 />
        <Counter3 />
      </div>

      <div className='flex-1 ml-6 bg-white p-4 rounded-lg shadow-md'>
        <h1 className='text-xl font-bold text-center'>Sphere</h1>
        <div className='h-[500px] flex justify-center items-center'>
          <Sphere />
        </div>
      </div>
    </div>
  )
}

export default App
