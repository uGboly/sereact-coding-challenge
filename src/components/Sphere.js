import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

function Sphere() {
  const [radius, setRadius] = useState(5);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');
    setWs(socket);
    // ws.send(JSON.stringify({ method: 'sphere.get_radius' }));
    ws.onmessage = (event) => {
      const { result } = JSON.parse(event.data);
      if (result) setRadius(result);
    };
    return () => socket.close();
  }, []);

  const updateRadius = (newRadius) => {
    ws.send(JSON.stringify({ method: 'sphere.set_radius', params: { radius: newRadius } }));
    setRadius(newRadius);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mt-4">
      <h1 className="text-2xl font-bold">Sphere Radius: {radius}</h1>
      <Canvas>
        <mesh>
          <sphereBufferGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </Canvas>
      <div className="mt-4 space-x-2">
        <button onClick={() => updateRadius(radius + 1)} className="btn">
          Increase Radius
        </button>
        <button onClick={() => updateRadius(radius - 1)} className="btn">
          Decrease Radius
        </button>
      </div>
    </div>
  );
}

export default Sphere;
