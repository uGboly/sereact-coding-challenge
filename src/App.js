import React from 'react'
import Counter from './components/Counter'
import Counter2 from './components/Counter2'
import Counter3 from './components/Counter3'
import Sphere from './components/Sphere'

function App () {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      <Counter />
      <Counter2 />
      <Counter3 />
      <Sphere />
    </div>
  )
}

export default App
