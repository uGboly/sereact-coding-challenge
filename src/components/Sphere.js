import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Canvas } from '@react-three/fiber'
import { initWebSocket, setRadius, getRadius } from '../redux/sphereSlice'

function SphereDisplay ({ radius }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color='blue' />
    </mesh>
  )
}

function Sphere () {
  const radius = useSelector(state => state.sphere.radius)
  const status = useSelector(state => state.sphere.status)
  const dispatch = useDispatch()
  const [inputRadius, setInputRadius] = useState(radius)

  useEffect(() => {
    dispatch(initWebSocket())
      .then(() => {
        dispatch(getRadius())
      })
      .catch(() => {
        console.error('Failed to connect to WebSocket')
      })
  }, [dispatch])

  const handleSetRadius = () => {
    dispatch(setRadius(parseFloat(inputRadius)))
  }

  const handleGetRadius = () => {
    dispatch(getRadius())
  }

  if (status === 'disconnected') {
    return <p>Unable to connect to the WebSocket server.</p>
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-md space-y-6'>
      <div className='controls flex items-center space-x-4'>
        <input
          type='number'
          value={inputRadius}
          onChange={e => setInputRadius(e.target.value)}
          className='w-24 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none'
          placeholder='Radius'
        />
        <button
          onClick={() => handleSetRadius(inputRadius)}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300'
        >
          Set Radius
        </button>
        <button
          onClick={handleGetRadius}
          className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring focus:ring-gray-300'
        >
          Get Radius
        </button>
      </div>

      <div className='h-96 bg-gray-100 rounded-lg flex justify-center items-center'>
        <Canvas style={{ height: '100%', width: '100%' }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <SphereDisplay radius={radius} />
        </Canvas>
      </div>
    </div>
  )
}

export default Sphere
