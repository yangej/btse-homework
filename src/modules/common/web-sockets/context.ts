import { createContext } from 'react';

import { BaseWebSocketType, OSSWebSocketType } from './hooks/useWebSocket';

type WebSocketsContextValue = {
  baseWebSocket: BaseWebSocketType;
  ossWebSocket: OSSWebSocketType;
};

export const WebSocketsContext = createContext<WebSocketsContextValue | null>(
  null,
);
