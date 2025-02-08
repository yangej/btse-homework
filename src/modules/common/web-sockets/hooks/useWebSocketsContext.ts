import { useContext } from 'react';

import { WebSocketsContext } from '../context';

export const useWebSocketsContext = () => {
  const value = useContext(WebSocketsContext);

  if (!value) {
    throw new Error(
      'useWebSocketsContext must be used within a WebSocketsContextProvider',
    );
  }

  return value;
};
