import { ReactNode } from 'react';

import { WebSocketsContext } from '../context';
import { useBaseWebSocket, useOSSWebSocket } from '../hooks/useWebSocket';

type WebSocketContextProviderProps = {
  children: ReactNode;
};

const WebSocketContextProvider = ({
  children,
}: WebSocketContextProviderProps) => {
  const baseWebSocket = useBaseWebSocket();
  const ossWebSocket = useOSSWebSocket();

  return (
    <WebSocketsContext.Provider value={{ ossWebSocket, baseWebSocket }}>
      {children}
    </WebSocketsContext.Provider>
  );
};

export default WebSocketContextProvider;
