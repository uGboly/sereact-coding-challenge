import { useEffect, useState } from 'react';

export function useWebSocket() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');
    setWs(socket);

    return () => socket.close();
  }, []);

  return ws;
}
