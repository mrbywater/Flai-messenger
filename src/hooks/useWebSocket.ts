import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket соединение установлено');
      setSocketConnected(true);
    };

    socket.onclose = () => {
      console.log('WebSocket соединение закрыто');
      setSocketConnected(false);
    };

    socket.onerror = (error: Event) => {
      console.error('WebSocket ошибка:', error);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { ws, socketConnected };
};

export default useWebSocket;
