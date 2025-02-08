import { useCallback, useEffect, useState } from 'react';

import { WEB_SOCKET_URL } from '../constants';

export type WebSocketHookValue<Topic extends string> = {
  ready: boolean;
  message: string | undefined;
  subscribe: (topic: Topic, args?: string[]) => void;
  unsubscribe: (topic: Topic, args?: string[]) => void;
};

export const useWebSocket = <Topic extends string>(
  endpoint: string,
): WebSocketHookValue<Topic> => {
  const [instance, setInstance] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | undefined>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const webSocket = new WebSocket(endpoint);

    webSocket.onopen = () => {
      console.info('Connection to ', endpoint, 'is opened');
      setReady(true);
    };

    webSocket.onclose = () => {
      console.info('Connection to ', endpoint, 'is closed');
      setInstance(null);
      setReady(false);
    };

    webSocket.onerror = (error) => {
      console.error('Connection to ', endpoint, 'failed', error);
    };

    webSocket.onmessage = (event) => {
      setMessage(event.data);
    };

    setInstance(webSocket);

    return () => {
      if (
        webSocket.readyState !== webSocket.CLOSED &&
        webSocket.readyState !== webSocket.CLOSING
      ) {
        webSocket.close();
      }
    };
  }, [endpoint]);

  const subscribe = useCallback(
    (topic: Topic, args?: string[]) => {
      if (!instance || instance.readyState !== instance.OPEN) return;

      instance.send(
        JSON.stringify({
          op: 'subscribe',
          args: args ? [topic, ...args] : [topic],
        }),
      );
    },
    [instance],
  );

  const unsubscribe = useCallback(
    (topic: Topic, args?: string[]) => {
      if (!instance || instance.readyState !== instance.OPEN) return;

      instance.send(
        JSON.stringify({
          op: 'unsubscribe',
          args: args ? [topic, ...args] : [topic],
        }),
      );
    },
    [instance],
  );

  return {
    ready,
    message,
    subscribe,
    unsubscribe,
  };
};

type OSSWebSocketSupportedTopics = 'update:BTCPFC_0';

export type OSSWebSocketType = WebSocketHookValue<OSSWebSocketSupportedTopics>;

export const useOSSWebSocket = (): OSSWebSocketType => {
  return useWebSocket(`${WEB_SOCKET_URL}/oss/futures`);
};

type BaseWebSocketSupportedTopics =
  | 'tradeHistoryApi:BTCPFC'
  | 'tradeHistoryApi';

export type BaseWebSocketType =
  WebSocketHookValue<BaseWebSocketSupportedTopics>;

export const useBaseWebSocket = (): BaseWebSocketType => {
  return useWebSocket(`${WEB_SOCKET_URL}/futures`);
};
