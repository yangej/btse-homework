import { ReactNode } from 'react';

import { WebSocketsContext } from '../context';
import { useOSSWebSocket } from '../hooks/useWebSocket';

type WebSocketContextProviderProps = {
  children: ReactNode;
};

const WebSocketContextProvider = ({
  children,
}: WebSocketContextProviderProps) => {
  const ossWebSocket = useOSSWebSocket();

  return (
    <WebSocketsContext.Provider value={{ ossWebSocket }}>
      {children}
    </WebSocketsContext.Provider>
  );
};

export default WebSocketContextProvider;
