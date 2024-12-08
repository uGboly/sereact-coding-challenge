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
    <div>
      <div className='controls'>
        <input
          type='number'
          value={inputRadius}
          onChange={e => setInputRadius(e.target.value)}
          className='input'
        />
        <button onClick={handleSetRadius} className='btn'>
          Set Radius
        </button>
        <button onClick={handleGetRadius} className='btn'>
          Get Radius
        </button>
      </div>
      <Canvas style={{ height: '400px', background: 'lightgray' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <SphereDisplay radius={radius} />
      </Canvas>
    </div>
  )
}

export default Sphere
