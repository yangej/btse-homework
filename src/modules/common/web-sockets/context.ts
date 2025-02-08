import { createContext } from 'react';

import { OSSWebSocketType } from './hooks/useWebSocket';

type WebSocketsContextValue = {
  ossWebSocket: OSSWebSocketType;
};

export const WebSocketsContext = createContext<WebSocketsContextValue | null>(
  null,
);
